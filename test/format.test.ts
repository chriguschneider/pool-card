import { describe, it, expect } from 'vitest';
import { formatNumber, clamp } from '../src/utils/format';

describe('formatNumber', () => {
  it('formats with one decimal by default', () => {
    expect(formatNumber(23.456)).toBe('23.5');
  });

  it('respects a custom decimal count', () => {
    expect(formatNumber(23.456, 2)).toBe('23.46');
  });

  it('returns an en-dash for non-finite values', () => {
    expect(formatNumber(Number.NaN)).toBe('–');
    expect(formatNumber(Number.POSITIVE_INFINITY)).toBe('–');
  });
});

describe('clamp', () => {
  it('clamps above the maximum', () => {
    expect(clamp(5, 0, 3)).toBe(3);
  });

  it('clamps below the minimum', () => {
    expect(clamp(-1, 0, 3)).toBe(0);
  });

  it('leaves in-range values untouched', () => {
    expect(clamp(2, 0, 3)).toBe(2);
  });
});
