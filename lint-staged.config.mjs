/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  'package.json': 'sort-package-json',
  '*': [
    'prettier --write --ignore-unknown',
    'autocorrect --fix',
    'cspell lint --no-progress --no-must-find-files --gitignore',
  ],
  '*.{ts,tsx}': 'bash -c tsc --noEmit',
  '*.{js,mjs,cjs,ts,tsx}': 'eslint --fix',
  '*.css': 'stylelint --fix',
  '*.html': 'htmlhint',
  '*.md': 'markdownlint --dot --fix',
  '*.ts': 'vitest related --run',
};
