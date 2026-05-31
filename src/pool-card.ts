import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { HomeAssistant, PoolCardConfig } from './types';
import {
  findPoolTemperatureSensors,
  getEntityName,
  getEntityState,
  getEntityUnit,
} from './utils/entity';
import { formatNumber } from './utils/format';

export const CARD_VERSION = __POOL_CARD_VERSION__;

@customElement('pool-card')
export class PoolCard extends LitElement {
  @state() private _config?: PoolCardConfig;

  // `hass` is a plain setter, not a reactive property, on purpose: HA fires it
  // several times per second. We keep the reference and only re-render when an
  // entity the card actually uses has changed.
  private _hass?: HomeAssistant;
  set hass(hass: HomeAssistant) {
    const previous = this._hass;
    this._hass = hass;
    if (this._hasRelevantChange(previous, hass)) {
      this.requestUpdate();
    }
  }

  setConfig(config: PoolCardConfig): void {
    if (!config) {
      throw new Error('pool-card: Ungültige Konfiguration');
    }
    if (config.temperature_sensors !== undefined && !Array.isArray(config.temperature_sensors)) {
      throw new Error('pool-card: "temperature_sensors" muss eine Liste sein');
    }
    this._config = config;
  }

  /** Sensible default config when the user adds the card from the picker. */
  static getStubConfig(hass: HomeAssistant): Omit<PoolCardConfig, 'type'> {
    const sensors = findPoolTemperatureSensors(hass);
    return { temperature_sensors: sensors.length ? sensors : ['sensor.pool_temperature'] };
  }

  getCardSize(): number {
    return 3;
  }

  private _sensors(): string[] {
    return this._config?.temperature_sensors ?? [];
  }

  private _hasRelevantChange(previous: HomeAssistant | undefined, next: HomeAssistant): boolean {
    if (!previous) {
      return true;
    }
    const ids = this._sensors();
    if (ids.length === 0) {
      return previous !== next;
    }
    return ids.some((id) => previous.states?.[id] !== next.states?.[id]);
  }

  private _formatValue(entityId: string): string {
    const raw = getEntityState(this._hass, entityId);
    const value = raw === undefined ? Number.NaN : Number(raw);
    if (!Number.isFinite(value)) {
      return '–';
    }
    const unit = getEntityUnit(this._hass, entityId) ?? '°C';
    return `${formatNumber(value)} ${unit}`;
  }

  static readonly styles = css`
    ha-card {
      overflow: hidden;
    }
    .content {
      padding: 16px;
      color: var(--primary-text-color, #212121);
    }
    .hint {
      color: var(--secondary-text-color, #727272);
      font-size: 14px;
    }
    ul.sensors {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ul.sensors li {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 6px 0;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }
    ul.sensors li:last-child {
      border-bottom: none;
    }
    .name {
      color: var(--secondary-text-color, #727272);
    }
    .val {
      font-variant-numeric: tabular-nums;
    }
  `;

  protected render() {
    if (!this._config) {
      return nothing;
    }
    const sensors = this._sensors();
    return html`
      <ha-card .header=${this._config.title ?? 'Pool'}>
        <div class="content">
          ${sensors.length
            ? html`
                <ul class="sensors">
                  ${sensors.map(
                    (id) => html`
                      <li>
                        <span class="name">${getEntityName(this._hass, id)}</span>
                        <span class="val">${this._formatValue(id)}</span>
                      </li>
                    `,
                  )}
                </ul>
              `
            : html`<div class="hint">Keine Temperatur-Sensoren konfiguriert.</div>`}
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: 'pool-card',
  name: 'Pool Card',
  description: 'Schlanke, schnelle Pool-Karte (Live-Werte, Verlauf, Steuerung).',
  preview: true,
});

console.info(
  `%c pool-card %c v${CARD_VERSION} `,
  'color:#fff;background:#1d76db;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;',
  'color:#1d76db;background:#e8f0fe;border-radius:0 4px 4px 0;padding:2px 6px;',
);
