import { defineConfig } from 'oxlint';

export default defineConfig({
  // https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#options
  options: {
    denyWarnings: true,
    reportUnusedDisableDirectives: 'error',
    respectEslintDisableDirectives: true,
    typeAware: true,
    typeCheck: true,
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
    // node
    'node',
    // vitest
    'vitest',
    // react
    'react',
    'react-perf',
    'jsx-a11y',
  ],
  // https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#env
  env: {
    builtin: true,
  },
  // https://oxc.rs/docs/guide/usage/linter/config.html#enable-groups-of-rules-with-categories
  categories: {
    correctness: 'error',
    suspicious: 'error',
    pedantic: 'off',
    perf: 'warn',
    style: 'off',
    restriction: 'off',
    nursery: 'off',
  },
  // https://oxc.rs/docs/guide/usage/linter/rules.html
  rules: {
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
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-cycle': 'error',
    'import/no-duplicates': [
      'error',
      {
        considerQueryString: true,
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
