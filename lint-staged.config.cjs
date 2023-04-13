module.exports = {
  'package.json': 'sort-package-json',
  '*.{js,ts,tsx,cjs,json,hbs,handlebars,css,scss,md,yaml,yml}':
    'prettier --write',
  '*.{ts,tsx}': 'bash -c tsc --noEmit',
  '*.{css,scss,ts,tsx}': 'stylelint --fix',
  '*.md': 'markdownlint --fix',
  '**': 'cspell --no-must-find-files',
};
