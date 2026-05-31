import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { PoolCardConfig } from './types';

export const CARD_VERSION = __POOL_CARD_VERSION__;

@customElement('pool-card')
export class PoolCard extends LitElement {
  @state() private _config?: PoolCardConfig;

  // `hass` is a plain setter, not a reactive property, on purpose: HA fires it
  // several times per second and we don't want a full re-render each time.
  // The placeholder doesn't read it yet — consumed from #5 (live panel) onward.
  set hass(_hass: unknown) {
    // intentionally unused for now
  }

  setConfig(config: PoolCardConfig): void {
    if (!config) {
      throw new Error('pool-card: Ungültige Konfiguration');
    }
    this._config = config;
  }

  getCardSize(): number {
    return 3;
  }

  static styles = css`
    .placeholder {
      padding: 16px;
      color: var(--primary-text-color, #212121);
      font-size: 14px;
      line-height: 1.4;
    }
    .placeholder small {
      color: var(--secondary-text-color, #727272);
    }
  `;

  protected render() {
    if (!this._config) {
      return nothing;
    }
    return html`
      <ha-card .header=${this._config.title ?? 'Pool'}>
        <div class="placeholder">
          🏊 pool-card Gerüst steht ✅
          <div><small>v${CARD_VERSION} · Lit + uPlot</small></div>
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
