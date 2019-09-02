const { addWebpackAlias } = require('customize-cra');

module.exports = () => {
  if (process.env.NODE_ENV) {
    const alias = {
      'react-dom': '@hot-loader/react-dom'
    };
    return addWebpackAlias(alias);
  }
  return null;
};
