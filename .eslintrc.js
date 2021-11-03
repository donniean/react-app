module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
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
  plugins: ['simple-import-sort'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': { webpack: { config: './webpack.config.alias.js' } },
  },
  rules: {
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
    'init-declarations': ['error', 'always'],
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
    'react/jsx-props-no-spreading': 'off',
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': [
      'error',
      { version: '>=14.0.0', ignores: ['modules'] },
    ],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
    {
      files: [
        '**/webpack.js',
        '**/webpack.*.js',
        '**/webpack.ts',
        '**/webpack.*.ts',
        '**/rollup.config.js',
        '**/rollup.*.js',
        '**/rollup.config.ts',
        '**/rollup.*.ts',
        '**/postcss.*.js',
        '**/docusaurus.config.js',
      ],
      rules: {
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['./src/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'sort-imports': 'off',
        'import/order': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react', '^prop-types', '^@?\\w'],
              [
                '^(@/(constants|containers|components|routes|pages|hooks|contexts|api|services|utils))(/.*|$)',
              ],
              ['^\\.', '^\\u0000'],
              [
                '^(@/styles)(/.*|$)',
                '^.+\\.module.s?css$',
                '^.+\\.s?css$',
                '^(@/assets)(/.*|$)',
              ],
            ],
          },
        ],
      },
    },
  ],
};
