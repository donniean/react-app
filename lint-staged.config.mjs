/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*': [
    'prettier --write --ignore-unknown',
    'autocorrect --fix',
    'cspell lint --no-progress --no-must-find-files --dot --gitignore',
  ],
  '*.css': 'stylelint --fix',
  '*.html': 'htmlhint',
  '*.md': 'markdownlint --dot --fix',
  '*.ts': 'vitest related --run',
  '*.{js,mjs,cjs,ts,tsx}': 'eslint --fix', // --max-warnings 0
  '*.{ts,tsx}': 'bash -c tsc --noEmit',
  'package.json': 'sort-package-json',
};
