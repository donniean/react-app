const webpackMerge = require('webpack-merge');

const { isDevelopmentEnv, isProductionEnv } = require('./config/env');

const baseConfig = require('./config/webpack.config.base');
const devConfig = require('./config/webpack.config.dev');
const prodConfig = require('./config/webpack.config.prod');

module.exports = () => {
  let config = null;
  if (isDevelopmentEnv) {
    config = webpackMerge(baseConfig, devConfig);
  } else if (isProductionEnv) {
    config = webpackMerge(baseConfig, prodConfig);
  }
  return config;
};
