/** Format a number with a fixed number of decimals, or an en-dash if invalid. */
export function formatNumber(value: number, decimals = 1): string {
  if (!Number.isFinite(value)) {
    return '–';
  }
  return value.toFixed(decimals);
}

/** Constrain a value to the inclusive [min, max] range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
