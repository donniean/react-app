module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'color-named': [
      'never',
      {
        ignore: ['inside-function'],
      },
    ],
    'no-unknown-animations': true,
  },
  ignoreFiles: [
    '**/node_modules/',
    '**/lib/',
    '**/build/',
    '**/dist/',
    '**/*.min.*',
  ],
  overrides: [
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
    },
    {
      files: ['**/*.{ts,tsx}'],
      customSyntax: 'postcss-styled-syntax',
      rules: {
        'no-empty-source': null,
        'value-keyword-case': null,
        'function-no-unknown': null,
      },
    },
  ],
};
