const { prodMode } = require('./config/env');

const plugins = ['react-hot-loader/babel', 'babel-plugin-styled-components'];
const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-react'
  ],
  plugins: prodMode
    ? plugins.concat(['transform-react-remove-prop-types'])
    : plugins
};

module.exports = config;
