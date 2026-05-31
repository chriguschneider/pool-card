import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import lit from 'eslint-plugin-lit';
import sonarjs from 'eslint-plugin-sonarjs';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  lit.configs['flat/recommended'],
  sonarjs.configs.recommended,
  {
    // Build/config scripts run in Node.
    files: ['**/*.js'],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    rules: {
      // hass / Lovelace objects are loosely typed at the boundary; tighten later.
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  // Keep Prettier last so it disables conflicting stylistic rules.
  prettier,
);
