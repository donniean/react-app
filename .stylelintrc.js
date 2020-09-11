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
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'selector-type-no-unknown': [true, { ignoreTypes: ['page'] }],
    'value-keyword-case': [
      'lower',
      {
        ignoreKeywords: [/^[a-z]+[A-Z][a-z]*/],
      },
    ],
    'shorthand-property-no-redundant-values': [true, { severity: 'warning' }],
    'property-no-vendor-prefix': [true, { severity: 'warning' }],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      { severity: 'warning' },
    ],
    'selector-attribute-quotes': ['always', { severity: 'warning' }],
    'selector-list-comma-space-after': ['always-single-line'],
    'no-unknown-animations': true,
  },
};
