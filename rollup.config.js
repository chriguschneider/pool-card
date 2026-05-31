import { readFileSync } from 'node:fs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const dev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/pool-card.ts',
  output: {
    file: 'dist/pool-card.js',
    format: 'es',
    sourcemap: dev,
  },
  plugins: [
    resolve(),
    replace({
      preventAssignment: true,
      values: {
        __POOL_CARD_VERSION__: JSON.stringify(pkg.version),
      },
    }),
    typescript({ tsconfig: './tsconfig.json', noEmitOnError: !dev }),
    !dev && terser({ format: { comments: false } }),
  ],
};
