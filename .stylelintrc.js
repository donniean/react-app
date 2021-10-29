module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-styled-components',
    'stylelint-config-rational-order',
    'stylelint-prettier/recommended',
  ],
  rules: {
    'color-named': ['never', { ignore: ['inside-function'] }],
    'value-keyword-case': ['lower', { ignoreKeywords: [/^[a-z]+[A-Z][a-z]*/] }],
    'selector-list-comma-space-after': 'always-single-line',
    'no-unknown-animations': true,
  },
};
