const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { prodSourceMap } = require('.');
const { root: rootPath } = require('./paths');

const prodConfig = {
  output: {
    filename: 'js/[name].[chunkhash].js'
  },
  devtool: prodSourceMap ? 'source-map' : false,
  optimization: {
    minimizer: [
      // TODO: https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/53 , cssnano
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: prodSourceMap
            ? { inline: false, annotation: true }
            : { inline: true }
        }
      }),
      new TerserPlugin({ sourceMap: prodSourceMap })
    ]
  },
  plugins: [new CleanWebpackPlugin()]
};

module.exports = prodConfig;
