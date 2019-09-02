const { override } = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireStyledComponents = require('react-app-rewire-styled-components');

const rewireReactHotLoaderReactDom = require('./react-app-rewire-hot-loader-react-dom');

module.exports = override(rewireReactHotLoaderReactDom(), (config, env) => {
  config = rewireReactHotLoader(config, env);
  config = rewireStyledComponents(config, env);
  return config;
});
