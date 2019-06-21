const rewireFaviconsPlugin = require('react-app-rewire-favicons-plugin');
const rewireStyledComponents = require('react-app-rewire-styled-components');

const faviconsWebpackPluginOptions = require('./faviconsWebpackPluginOptions');

module.exports = {
  webpack(config, env) {
    config = rewireFaviconsPlugin(config, env, faviconsWebpackPluginOptions);
    config = rewireStyledComponents(config, env);
    return config;
  }
};
