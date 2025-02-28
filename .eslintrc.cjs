/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    'shared-node-browser': true,
    es6: true,
    es2016: true,
    es2017: true,
    es2018: true,
    es2019: true,
    es2020: true,
    es2021: true,
    es2022: true,
    worker: true,
  },
  extends: [
    'airbnb',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../..'],
      },
    ],
    'no-useless-call': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**',
          'tests/**',
          'spec/**',
          '**/__tests__/**',
          '**/__mocks__/**',
          'test.{js,jsx}',
          'test-*.{js,jsx}',
          '**/*{.,_}{test,spec}.{js,jsx}',
          '**/*.{mjs,cjs}',
          '**/.*.{mjs,cjs}',
        ],
        optionalDependencies: false,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
          'unknown',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
        },
        warnOnUnassignedImports: true,
      },
    ],
    'import/prefer-default-export': 'off',
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
  },
  overrides: [
    {
      files: ['**/*.{mjs,ts,tsx}'],
      plugins: ['simple-import-sort'],
      rules: {
        'sort-imports': 'off',
        'import/order': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      parserOptions: {
        project: true,
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'airbnb-typescript',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
          },
        ],
      },
    },
    {
      files: ['./src/**/*.{ts,tsx}'],
      extends: [
        'airbnb/hooks',
        'plugin:react/jsx-runtime',
        // 'plugin:@next/next/recommended',
        // 'plugin:@next/next/core-web-vitals',
        'prettier',
      ],
      rules: {
        'no-console':
          process.env.NODE_ENV === 'development'
            ? 'off'
            : ['error', { allow: ['warn', 'error'] }],
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
        'import/no-duplicates': [
          'error',
          {
            considerQueryString: true,
          },
        ],
        'react/jsx-key': 'error',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-sort-props': [
          'error',
          {
            callbacksLast: true,
            noSortAlphabetically: true,
            reservedFirst: true,
          },
        ],
        'react/require-default-props': [
          'error',
          {
            forbidDefaultForRequired: true,
            functions: 'defaultArguments',
          },
        ],
        'react/sort-prop-types': [
          'error',
          {
            callbacksLast: true,
            requiredFirst: true,
            noSortAlphabetically: true,
          },
        ],
      },
    },
    {
      files: ['**/*.test.ts'],
      extends: ['plugin:vitest/recommended'],
    },
  ],
};
