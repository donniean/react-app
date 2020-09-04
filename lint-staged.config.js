module.exports = {
  '*.{js,ts,jsx,tsx,json,html,vue,css,less,scss,md,yaml}': [
    'prettier --write',
    'git add',
  ],
  '*.{js,jsx,html,vue}': ['eslint --fix', 'git add'],
};
