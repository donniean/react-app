export default {
  'package.json': 'sort-package-json',
  '*': [
    'prettier --write --ignore-unknown',
    'cspell lint --no-progress --relative --no-must-find-files --dot --gitignore',
  ],
  '*.{ts,tsx}': 'bash -c tsc --noEmit',
  '*.{js,mjs,cjs,ts,tsx}': 'eslint --fix',
  '*.{css,scss}': 'stylelint --fix',
  '*.md': 'markdownlint  --dot --fix',
};
