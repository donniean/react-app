const webpack = require('webpack');

const { dist: distPath } = require('./paths');

const devConfig = {
  output: {
    filename: 'js/[name].[hash].js'
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  // TODO: devServer, HotModuleReplacementPlugin, react-hot-loader, module.hot.accept
  devServer: {
    contentBase: distPath,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    port: 8080
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = devConfig;
