/** Minimal slice of a Home Assistant entity state we rely on. */
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    device_class?: string;
    [key: string]: unknown;
  };
}

/** Minimal slice of the `hass` object passed to the card. */
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  [key: string]: unknown;
}

/** Configuration accepted by the pool-card (grows with later features). */
export interface PoolCardConfig {
  type: string;
  title?: string;
  /** Temperature sensors to plot; daily view aggregates them into high/low (see #2). */
  temperature_sensors?: string[];
}
