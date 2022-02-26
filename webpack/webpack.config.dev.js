/* cspell: disable-next-line */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const config = require('config');
const { merge } = require('webpack-merge');

const paths = require('../scripts/utils/paths');
const baseConfig = require('./webpack.config.base');

const serverPort = config?.server?.port;
const serverProxy = config?.server?.proxy;

const devConfig = {
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: serverPort,
    proxy: serverProxy,
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
