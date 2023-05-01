const {
  isEnvDevelopment,
  isEnvProduction,
} = require('./scripts/utils/env.cjs');
const devConfig = require('./webpack/webpack.config.dev.cjs');
const prodConfig = require('./webpack/webpack.config.prod.cjs');

module.exports = () => {
  let config = null;
  if (isEnvDevelopment) {
    config = devConfig;
  } else if (isEnvProduction) {
    config = prodConfig;
  }
  return config;
};
