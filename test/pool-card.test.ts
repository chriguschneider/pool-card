import { describe, it, expect } from 'vitest';
import '../src/pool-card';

describe('pool-card', () => {
  it('registers the custom element', () => {
    expect(customElements.get('pool-card')).toBeTruthy();
  });

  it('registers itself in window.customCards', () => {
    const found = window.customCards?.some((c) => c.type === 'pool-card');
    expect(found).toBe(true);
  });

  it('throws on missing config', () => {
    const el = document.createElement('pool-card') as any;
    expect(() => el.setConfig(undefined)).toThrow();
  });

  it('renders the placeholder after setConfig', async () => {
    const el = document.createElement('pool-card') as any;
    el.setConfig({ type: 'custom:pool-card', title: 'Mein Pool' });
    document.body.appendChild(el);
    await el.updateComplete;

    const text = el.shadowRoot?.textContent ?? '';
    expect(text).toContain('Gerüst steht');
  });
});
