# Pool Card

A lean, fast custom Home Assistant Lovelace card for monitoring and controlling a pool — built with Lit and uPlot.

## Features

- Theme-aware card showing your configured pool temperature sensors with live values
- Auto-detection of pool temperature sensors when added from the card picker
- More in progress: live panel, history chart (daily high/low), and controls

## Configuration

```yaml
type: custom:pool-card
title: Pool
temperature_sensors:
  - sensor.pool_temperature
  - sensor.pool_surface_temperature
```

See the [README](https://github.com/chriguschneider/pool-card#readme) for full documentation.
