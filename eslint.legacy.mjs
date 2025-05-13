export default {
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
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
  },
  overrides: [
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
      rules: {
        'no-console':
          globalThis.process.env.NODE_ENV === 'development'
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
  ],
};
