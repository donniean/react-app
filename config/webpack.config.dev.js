const webpack = require('webpack');
const { merge } = require('webpack-merge');
/* cspell: disable-next-line */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { dist: distPath } = require('./paths');
const baseConfig = require('./webpack.config.base');

const devConfig = {
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
  },
  devtool: 'cheap-module-source-map',
  // TODO: devServer
  devServer: {
    contentBase: distPath,
    historyApiFallback: true,
    hot: true,
    quiet: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
};

module.exports = merge(baseConfig, devConfig);
