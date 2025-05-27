export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
    'stylelint-config-css-modules',
    'stylelint-config-recess-order',
  ],
  rules: {
    'color-named': [
      'never',
      {
        ignore: ['inside-function'],
      },
    ],
  },
};
