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
    development: {
      plugins: ['react-refresh/babel'],
    },
    production: {
      plugins: ['transform-react-remove-prop-types'],
    },
  },
};
