const rewireStyledComponents = require('react-app-rewire-styled-components');

const faviconsWebpackPluginOptions = require('./faviconsWebpackPluginOptions');

module.exports = {
  webpack(config, env) {
    config = rewireStyledComponents(config, env);
    return config;
  }
};
