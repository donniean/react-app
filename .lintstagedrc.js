module.exports = {
  '*.{js,jsx,css,scss,json,md}': 'prettier --write',
  '*.{js,jsx}': 'eslint --fix',
  '*.{css,scss}': 'stylelint --fix',
  '**': 'cspell --no-must-find-files',
};
