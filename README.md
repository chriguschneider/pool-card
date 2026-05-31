# pool-card

A lean, fast custom [Home Assistant](https://www.home-assistant.io/) Lovelace card for monitoring and controlling a pool — built with [Lit](https://lit.dev/) and [uPlot](https://github.com/leeoniya/uPlot).

## Installation

### HACS (recommended)

This card is not yet in the HACS default store, so add it as a custom repository:

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=chriguschneider&repository=pool-card&category=plugin)

1. Click the button above (or in HACS: **⋮ → Custom repositories**, URL `https://github.com/chriguschneider/pool-card`, category **Dashboard**).
2. Install **Pool Card** from HACS.
3. Reload your browser.

### Manual

1. Download `pool-card.js` from the [latest release](https://github.com/chriguschneider/pool-card/releases).
2. Copy it into `config/www/`.
3. Add it as a dashboard resource (**Settings → Dashboards → ⋮ → Resources**):
   - URL `/local/pool-card.js`, type **JavaScript Module**.

## Configuration

```yaml
type: custom:pool-card
title: Pool
temperature_sensors:
  - sensor.pool_temperature
  - sensor.pool_surface_temperature
```

| Option                | Type     | Default                   | Description                                                                           |
| --------------------- | -------- | ------------------------- | ------------------------------------------------------------------------------------- |
| `title`               | string   | `Pool`                    | Card header.                                                                          |
| `temperature_sensors` | string[] | auto-detected pool probes | Temperature sensors to display; the daily chart aggregates them into a high/low band. |

When added from the card picker, pool temperature sensors are auto-detected.

## Development

```bash
npm install
npm run build      # bundle to dist/pool-card.js
npm start          # watch/rebuild during development
npm run check      # format, lint, typecheck, depcheck, test, build
```

## License

[MIT](LICENSE)
