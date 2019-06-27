const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireStyledComponents = require('react-app-rewire-styled-components');

const rewireReactHotLoaderReactDom = require('./react-app-rewire-hot-loader-react-dom');

module.exports = {
  webpack(config, env) {
    config = rewireReactHotLoader(config, env);
    config = rewireReactHotLoaderReactDom(config, env);
    config = rewireStyledComponents(config, env);
    console.log(config);
    return config;
  }
};
