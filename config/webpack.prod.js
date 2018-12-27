const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { prodSourceMap } = require('./');
const { root: rootPath } = require('./paths');

const prodConfig = {
  output: {
    filename: 'js/[name].[chunkhash].js'
  },
  devtool: prodSourceMap ? 'source-map' : false,
  // TODO: https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/53 , cssnano
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: prodSourceMap
            ? { inline: false, annotation: true }
            : { inline: true }
        }
      }),
      new UglifyJsPlugin({ sourceMap: prodSourceMap })
    ]
  },
  plugins: [new CleanWebpackPlugin(['dist'], { root: rootPath })]
};

module.exports = prodConfig;
