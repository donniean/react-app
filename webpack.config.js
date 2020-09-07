const { isDevelopmentEnv, isProductionEnv } = require('./config/env');
const devConfig = require('./config/webpack.config.dev');
const prodConfig = require('./config/webpack.config.prod');

module.exports = () => {
  let config = null;
  if (isDevelopmentEnv) {
    config = devConfig;
  } else if (isProductionEnv) {
    config = prodConfig;
  }
  return config;
};
