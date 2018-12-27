const webpackMerge = require('webpack-merge');

const { devMode, prodMode } = require('./config/env');

const commonConfig = require('./config/webpack.common');
const devConfig = require('./config/webpack.dev');
const prodConfig = require('./config/webpack.prod');

module.exports = () => {
  let config = null;
  if (devMode) {
    config = webpackMerge(commonConfig, devConfig);
  } else if (prodMode) {
    config = webpackMerge(commonConfig, prodConfig);
  }
  return config;
};
