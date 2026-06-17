import { defineConfig } from 'oxlint';

export default defineConfig({
  options: {
    reportUnusedDisableDirectives: 'error',
    respectEslintDisableDirectives: false,
    typeAware: true,
    typeCheck: true,
  },
  env: {
    builtin: true,
  },
  // https://oxc.rs/docs/guide/usage/linter/config.html#enable-groups-of-rules-with-categories
  categories: {
    correctness: 'error',
    nursery: 'off',
    pedantic: 'off',
    perf: 'warn',
    restriction: 'off',
    style: 'warn',
    suspicious: 'error',
  },
  // https://oxc.rs/docs/guide/usage/linter/plugins.html#supported-plugins
  plugins: [
    'eslint',
    'typescript',
    'unicorn',
    'oxc',
    'import',
    'jsdoc',
    'promise',
    // Node
    'node',
    // Vitest
    'vitest',
    // React
    'react',
    'react-perf',
    'jsx-a11y',
  ],
  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-cycle': 'error',
    'import/no-duplicates': [
      'error',
      {
        considerQueryString: true,
      },
    ],
    'no-console': [
      process.env['NODE_ENV'] === 'development' ? 'warn' : 'error',
      { allow: ['warn', 'error'] },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../..'],
      },
    ],
    'typescript/consistent-type-exports': 'error',
    'typescript/consistent-type-imports': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
  },
  overrides: [
    {
      env: {
        node: true,
      },
      excludeFiles: ['src/**'],
      files: ['**/*.js', '**/*.mjs', '**/*.ts'],
    },
    {
      env: {
        commonjs: true,
        node: true,
      },
      files: ['**/*.cjs'],
    },
    {
      env: {
        browser: true,
      },
      files: ['src/**'],
    },
    {
      excludeFiles: ['**/*.test.*', '**/mocks/**', '**/*.mock.*'],
      files: ['src/**'],
      jsPlugins: ['eslint-plugin-i18next'],
      rules: {
        'i18next/no-literal-string': 'error',
      },
    },
  ],
});
