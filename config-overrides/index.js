const rewireFaviconsPlugin = require('react-app-rewire-favicons-plugin');
const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = {
  webpack(config, env) {
    config = rewireFaviconsPlugin(config, env, {});
    config = rewireStyledComponents(config, env);
    return config;
  }
};
