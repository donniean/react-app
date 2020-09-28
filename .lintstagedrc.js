module.exports = {
  '*.{js,jsx,css,scss,html,json,md}': 'prettier --write',
  '*.{js,jsx,html}': 'eslint --fix',
  '*.{css,scss,js,jsx}': 'stylelint --fix',
  '*.*': 'cspell',
};
