const webpack = require('webpack');
const { merge } = require('webpack-merge');

const { dist: distPath } = require('./paths');
const baseConfig = require('./webpack.config.base');

const devConfig = {
  output: {
    filename: 'js/[name].[hash].js',
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  // TODO: devServer, HotModuleReplacementPlugin, react-hot-loader, module.hot.accept
  devServer: {
    contentBase: distPath,
    historyApiFallback: true,
    host: '127.0.0.1',
    port: 8080,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge(baseConfig, devConfig);
