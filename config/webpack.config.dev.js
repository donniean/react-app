const webpack = require('webpack');
const { merge } = require('webpack-merge');
/* cspell: disable-next-line */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { PROXY } = require('./constants');
const { dist: distPath } = require('./paths');
const baseConfig = require('./webpack.config.base');

const devConfig = {
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: distPath,
    historyApiFallback: true,
    hot: true,
    stats: 'errors-warnings',
    proxy: PROXY,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
};

module.exports = merge(baseConfig, devConfig);
