import type { HomeAssistant } from '../types';

/** Friendly name of an entity, falling back to its id. */
export function getEntityName(hass: HomeAssistant | undefined, entityId: string): string {
  return hass?.states?.[entityId]?.attributes?.friendly_name ?? entityId;
}

/** Raw state string of an entity, or undefined if unknown. */
export function getEntityState(
  hass: HomeAssistant | undefined,
  entityId: string,
): string | undefined {
  return hass?.states?.[entityId]?.state;
}

/** Unit of measurement of an entity, or undefined. */
export function getEntityUnit(
  hass: HomeAssistant | undefined,
  entityId: string,
): string | undefined {
  return hass?.states?.[entityId]?.attributes?.unit_of_measurement;
}

/** All temperature sensors whose entity id mentions the pool. */
export function findPoolTemperatureSensors(hass: HomeAssistant | undefined): string[] {
  return Object.values(hass?.states ?? {})
    .filter(
      (e) =>
        e.entity_id.startsWith('sensor.') &&
        e.attributes?.device_class === 'temperature' &&
        /pool/i.test(e.entity_id),
    )
    .map((e) => e.entity_id)
    .sort();
}
