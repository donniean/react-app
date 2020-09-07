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
  },
  plugins: ['html'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaFeatures: { jsx: true },
  },
  rules: {
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
  ],
};
