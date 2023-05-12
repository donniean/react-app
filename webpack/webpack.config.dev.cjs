/* cspell: disable-next-line */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.config.base.cjs');
const paths = require('../scripts/utils/paths.cjs');

const devConfig = {
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: process.env.SERVER_PORT,
    historyApiFallback: true,
    hot: true,
    static: {
      directory: paths.dist,
    },
    devMiddleware: {
      stats: 'errors-warnings',
    },
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};

module.exports = merge(baseConfig, devConfig);
