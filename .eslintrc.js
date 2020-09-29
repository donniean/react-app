module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
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
  plugins: ['html', 'simple-import-sort'],
  root: true,
  rules: {
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
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-builtins': [
      'error',
      { version: '>=12.0.0', ignores: [] },
    ],
    'node/no-unsupported-features/es-syntax': [
      'error',
      { version: '>=12.0.0', ignores: ['modules'] },
    ],
    'node/no-unsupported-features/node-builtins': [
      'error',
      { version: '>=12.0.0', ignores: [] },
    ],
    'react/jsx-props-no-spreading': 'off',
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaFeatures: { jsx: true },
  },
  overrides: [
    {
      files: [
        'webpack.js',
        'webpack.*.js',
        'rollup.js',
        'rollup.*.js',
        'gulpfile.js',
        'gulpfile.*.js',
        'postcss.config.js',
        'postcss.*.js',
      ],
      rules: {
        'node/no-unpublished-import': 'off',
        'node/no-unpublished-require': 'off',
      },
    },
    {
      files: ['./src/**/*.{js,jsx}'],
      rules: {
        'sort-imports': 'off',
        'import/order': 'off',
        'simple-import-sort/sort': [
          'error',
          {
            groups: [
              ['^react', '^prop-types', '^@?\\w'],
              [
                '^(@/(constants|containers|components|routes|pages|hooks|contexts|services|utils))(/.*|$)',
              ],
              ['^\\.', '^\\u0000'],
              ['^(@/styles)(/.*|$)', '^.+\\.s?css$', '^(@/assets)(/.*|$)'],
            ],
          },
        ],
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {},
      webpack: { config: './config/webpack.config.dev.js' },
    },
  },
};
