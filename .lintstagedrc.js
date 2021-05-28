module.exports = {
  '*.{js,jsx,css,scss,json,md}': 'prettier --write',
  '*.{js,jsx}': 'eslint --fix',
  '*.{css,scss,js,jsx}': 'stylelint --fix',
  // '*': 'cspell',
};
