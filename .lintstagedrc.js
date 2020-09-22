module.exports = {
  '*.{js,jsx,json,html,css,less,scss,md,yaml}': 'prettier --write',
  '*.{js,jsx,html}': 'eslint --fix',
  '*.{css,less,scss,js,jsx}': 'stylelint --fix',
  '*.*': 'cspell',
};
