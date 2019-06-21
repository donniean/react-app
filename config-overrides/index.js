const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = {
  webpack(config, env) {
    config = rewireStyledComponents(config, env);
    return config;
  }
};
