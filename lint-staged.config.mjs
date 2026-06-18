/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*': [
    'oxfmt --no-error-on-unmatched-pattern',
    'autocorrect --fix',
    'cspell lint --no-progress --no-must-find-files --dot --gitignore',
    () => 'pnpm run i18n:types',
    () => 'pnpm run lint:i18n',
  ],
  '*.{ts,tsx}': () => 'tsc --build',
  '*.{js,mjs,cjs,ts,tsx}': 'oxlint --fix',
  '*.css': 'stylelint --fix',
  '*.html': 'html-validate',
  '*.md': 'markdownlint --dot --fix',
  '*.ts': 'vitest related --run',
};
