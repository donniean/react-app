module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind'],
      },
    ],
    'color-named': [
      'never',
      {
        ignore: ['inside-function'],
      },
    ],
    'no-unknown-animations': true,
  },
  overrides: [
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss'],
      rules: {
        'scss/at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['tailwind'],
          },
        ],
      },
    },
  ],
};
