import { describe, it, expect } from 'vitest';
import { PoolCard } from '../src/pool-card';
import type { HomeAssistant } from '../src/types';

const hass: HomeAssistant = {
  states: {
    'sensor.pool_temperature': {
      entity_id: 'sensor.pool_temperature',
      state: '23.146',
      attributes: {
        friendly_name: 'Pool Temperature',
        unit_of_measurement: '°C',
        device_class: 'temperature',
      },
    },
    'sensor.pool_surface_temperature': {
      entity_id: 'sensor.pool_surface_temperature',
      state: '24.0',
      attributes: {
        friendly_name: 'Pool Surface',
        unit_of_measurement: '°C',
        device_class: 'temperature',
      },
    },
    'light.living_room': {
      entity_id: 'light.living_room',
      state: 'on',
      attributes: {},
    },
  },
};

function makeCard(config: Record<string, unknown> = { type: 'custom:pool-card' }): any {
  const el: any = document.createElement('pool-card');
  el.setConfig(config);
  return el;
}

describe('pool-card', () => {
  it('registers the custom element', () => {
    expect(customElements.get('pool-card')).toBeTruthy();
  });

  it('registers itself in window.customCards', () => {
    expect(window.customCards?.some((c) => c.type === 'pool-card')).toBe(true);
  });

  it('throws on missing config', () => {
    const el: any = document.createElement('pool-card');
    expect(() => el.setConfig(undefined)).toThrow();
  });

  it('throws when temperature_sensors is not a list', () => {
    const el: any = document.createElement('pool-card');
    expect(() =>
      el.setConfig({ type: 'custom:pool-card', temperature_sensors: 'sensor.x' }),
    ).toThrow();
  });

  it('getStubConfig auto-detects pool temperature sensors', () => {
    const stub = PoolCard.getStubConfig(hass);
    expect(stub.temperature_sensors).toEqual([
      'sensor.pool_surface_temperature',
      'sensor.pool_temperature',
    ]);
  });

  it('renders the title and configured sensor values', async () => {
    const el = makeCard({
      type: 'custom:pool-card',
      title: 'Mein Pool',
      temperature_sensors: ['sensor.pool_temperature'],
    });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;

    const card = el.shadowRoot?.querySelector('ha-card');
    expect(card?.getAttribute('header') ?? card?.header).toBeDefined();
    const text = el.shadowRoot?.textContent ?? '';
    expect(text).toContain('Pool Temperature');
    expect(text).toContain('23.1');
    expect(text).toContain('°C');
  });

  it('shows a hint when no sensors are configured', async () => {
    const el = makeCard({ type: 'custom:pool-card' });
    el.hass = hass;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot?.textContent ?? '').toContain('Keine Temperatur-Sensoren');
  });
});
