module.exports = {
  '*.{js,jsx,html,vue,css,scss,json,md}': ['prettier --write', 'git add'],
  '*.{js,jsx,html,vue}': ['eslint --fix', 'git add'],
  '*.{css,scss,js,jsx,vue}': ['stylelint --fix', 'git add']
};
