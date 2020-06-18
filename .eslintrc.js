module.exports = {
  plugins: ['html'],
  parserOptions: { parser: 'babel-eslint' },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
};
