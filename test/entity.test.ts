import { describe, it, expect } from 'vitest';
import {
  findPoolTemperatureSensors,
  getEntityName,
  getEntityState,
  getEntityUnit,
} from '../src/utils/entity';
import type { HomeAssistant } from '../src/types';

const hass: HomeAssistant = {
  states: {
    'sensor.pool_temperature': {
      entity_id: 'sensor.pool_temperature',
      state: '23.1',
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
    'sensor.kitchen_temperature': {
      entity_id: 'sensor.kitchen_temperature',
      state: '21.0',
      attributes: {
        friendly_name: 'Kitchen',
        unit_of_measurement: '°C',
        device_class: 'temperature',
      },
    },
    'switch.pool_pump': {
      entity_id: 'switch.pool_pump',
      state: 'on',
      attributes: { friendly_name: 'Pool Pump' },
    },
  },
};

describe('getEntityName', () => {
  it('returns the friendly name', () => {
    expect(getEntityName(hass, 'sensor.pool_temperature')).toBe('Pool Temperature');
  });
  it('falls back to the entity id', () => {
    expect(getEntityName(hass, 'sensor.unknown')).toBe('sensor.unknown');
    expect(getEntityName(undefined, 'sensor.x')).toBe('sensor.x');
  });
});

describe('getEntityState / getEntityUnit', () => {
  it('reads state and unit', () => {
    expect(getEntityState(hass, 'sensor.pool_temperature')).toBe('23.1');
    expect(getEntityUnit(hass, 'sensor.pool_temperature')).toBe('°C');
  });
  it('returns undefined for unknown entities', () => {
    expect(getEntityState(hass, 'sensor.nope')).toBeUndefined();
    expect(getEntityUnit(undefined, 'sensor.nope')).toBeUndefined();
  });
});

describe('findPoolTemperatureSensors', () => {
  it('finds only pool temperature sensors, sorted', () => {
    expect(findPoolTemperatureSensors(hass)).toEqual([
      'sensor.pool_surface_temperature',
      'sensor.pool_temperature',
    ]);
  });
  it('handles missing hass', () => {
    expect(findPoolTemperatureSensors(undefined)).toEqual([]);
  });
});
