/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  'package.json': 'sort-package-json',
  '*': [
    'prettier --write --ignore-unknown',
    'autocorrect --fix',
    'cspell lint --no-progress --no-must-find-files --dot --gitignore',
    () => 'pnpm run lint:i18n',
  ],
  '*.{ts,tsx}': () => 'tsc --build',
  '*.{js,mjs,cjs,ts,tsx}': 'eslint --fix', // --max-warnings 0
  '*.css': 'stylelint --fix',
  '*.html': 'html-validate',
  '*.md': 'markdownlint --dot --fix',
  '*.ts': 'vitest related --run',
};
