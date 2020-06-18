module.exports = {
  '*.{js,jsx,ts,tsx,html,vue,css,scss,json,md}': [
    'prettier --write',
    'git add',
  ],
  '*.{js,jsx,html,vue}': ['eslint --fix', 'git add'],
};
