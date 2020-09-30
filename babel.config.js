module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['babel-plugin-styled-components', 'lodash'],
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types', 'react-refresh/babel'],
    },
  },
};
