module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-styled-components',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'color-named': ['never', { ignore: ['inside-function'] }],
    'font-family-name-quotes': 'always-where-recommended',
    'value-keyword-case': ['lower', { ignoreKeywords: [/^[a-z]+[A-Z][a-z]*/] }],
    'shorthand-property-no-redundant-values': true,
    'property-no-vendor-prefix': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'selector-attribute-quotes': 'always',
    'selector-list-comma-space-after': 'always-single-line',
    'no-unknown-animations': true,
  },
};
