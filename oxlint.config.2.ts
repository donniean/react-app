import type { OxlintConfig } from 'oxlint';
import { defineConfig } from 'oxlint';

// https://oxc.rs/docs/guide/usage/linter/plugins.html#supported-plugins

const basePlugins = [
  'eslint',
  'typescript',
  'unicorn',
  'oxc',
  'import',
  'jsdoc',
  'promise',
] as const satisfies OxlintConfig['plugins'];

const nodePlugins = ['node'] as const satisfies OxlintConfig['plugins'];

const reactPlugins = [
  'react',
  'react-perf',
  'jsx-a11y',
] as const satisfies OxlintConfig['plugins'];

const vitestPlugins = ['vitest'] as const satisfies OxlintConfig['plugins'];

const baseJsPlugins = [] as const satisfies OxlintConfig['jsPlugins'];

const i18nJsPlugins = [
  'eslint-plugin-i18next',
] as const satisfies OxlintConfig['jsPlugins'];

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: true,
    reportUnusedDisableDirectives: 'error',
    respectEslintDisableDirectives: false,
  },
  env: {
    builtin: true,
  },
  categories: {
    correctness: 'off',
    suspicious: 'off',
    pedantic: 'off',
    perf: 'off',
    style: 'off',
    restriction: 'warn',
    nursery: 'off',
  },
  plugins: basePlugins,
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
    'typescript/consistent-type-exports': 'error',
    'typescript/consistent-type-imports': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
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
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.mjs', '**/*.ts'],
      excludeFiles: ['src/**'],
      env: {
        node: true,
      },
    },
    {
      files: ['**/*.cjs'],
      env: {
        commonjs: true,
        node: true,
      },
    },
    {
      files: ['src/**'],
      env: {
        browser: true,
      },
      plugins: [...basePlugins, ...reactPlugins],
    },
    {
      files: ['src/**'],
      excludeFiles: ['**/*.test.*', '**/mocks/**', '**/*.mock.*'],
      jsPlugins: [...baseJsPlugins, ...i18nJsPlugins],
      rules: {
        'i18next/no-literal-string': 'error',
      },
    },
    {
      files: ['src/testing/**', '**/*.test.{js,ts,tsx}'],
      plugins: [...basePlugins, ...vitestPlugins],
    },
    {
      files: ['server/**'],
      env: {
        node: true,
      },
      plugins: [...basePlugins, ...nodePlugins],
    },
  ],
});
