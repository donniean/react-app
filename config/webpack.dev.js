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
    port: 8080,
    proxy: {
      '/proxyApi': {
        target: 'http://zdg.zdtx123.com',
        changeOrigin: true,
        pathRewrite: {
          '^/proxyApi': ''
        }
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = devConfig;
