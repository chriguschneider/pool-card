import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    __POOL_CARD_VERSION__: JSON.stringify('test'),
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts'],
    },
  },
});
