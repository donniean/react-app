const { merge } = require('webpack-merge');
/* cspell: disable-next-line */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const paths = require('../scripts/utils/paths');
const baseConfig = require('./webpack.config.base');

let PROXY = {};

try {
  PROXY = JSON.parse(process.env.PROXY);
  // eslint-disable-next-line no-empty
} catch {}

const devConfig = {
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    port: process.env.PORT,
    proxy: PROXY,
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
