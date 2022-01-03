const { isEnvDevelopment } = require('./scripts/utils/env');

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    'shared-node-browser': true,
    amd: true,
    es6: true,
    es2017: true,
    es2020: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  /* settings: {
    'import/resolver': {
      webpack: { config: './webpack/webpack.config.dev.js' },
    },
  }, */
  rules: {
    'no-console': isEnvDevelopment ? 'warn' : 'error',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc',
          'accumulator',
          'e',
          'ctx',
          'context',
          'req',
          'request',
          'res',
          'response',
          '$scope',
          'staticContext',
          'draft',
        ],
      },
    ],
    'no-useless-call': 'error',
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
        'newlines-between': 'always',
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'function-expression',
      },
    ],
    'react/jsx-key': 'error',
    'react/jsx-props-no-spreading': 'off',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: './tsconfig.json',
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
    {
      files: ['./src/**/*.{js,jsx,ts,tsx}'],
      plugins: ['simple-import-sort'],
      rules: {
        'sort-imports': 'off',
        'import/order': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react', '^prop-types', '^@?\\w'],
              [
                '^(@/(types|themes|constants|containers|components|routes|pages|hooks|contexts|utils|apis|services))(/.*|$)',
              ],
              ['^\\.', '^\\u0000'],
              [
                '^(@/styles)(/.*|$)',
                '^.+\\.module.s?css$',
                '^.+\\.s?css$',
                '^(@/assets)(/.*|$)',
              ],
              ['^(@public)(/.*|$)'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
      },
    },
    {
      files: ['!(./src/**/*.{js,jsx,ts,tsx})'],
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
  ],
};
