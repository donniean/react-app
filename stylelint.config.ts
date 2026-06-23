import type { Config } from 'stylelint';

const config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-recess-order',
  ],
  ignoreFiles: ['**/coverage/**', '**/dist/**', '**/.next/**', '**/*.min.*'],
  rules: {
    'color-named': [
      'never',
      {
        ignore: ['inside-function'],
      },
    ],
    // Tailwind CSS
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'theme',
          'source',
          'utility',
          'variant',
          'custom-variant',
          'plugin',
          'apply',
          'reference',
        ],
      },
    ],
    'import-notation': null,
  },
} satisfies Config;

export default config;
