const { isEnvDevelopment, isEnvProduction } = require('./config/env');
const devConfig = require('./config/webpack.config.dev');
const prodConfig = require('./config/webpack.config.prod');

module.exports = () => {
  let config = null;
  if (isEnvDevelopment) {
    config = devConfig;
  } else if (isEnvProduction) {
    config = prodConfig;
  }
  return config;
};
