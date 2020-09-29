const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

const { GENERATE_SOURCEMAP } = require('./constants');
const baseConfig = require('./webpack.config.base');

const smp = new SpeedMeasurePlugin();

const prodConfig = {
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
  },
  devtool: GENERATE_SOURCEMAP ? 'source-map' : false,
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    minimizer: [
      // TODO: https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/53 , cssnano
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: GENERATE_SOURCEMAP
            ? { inline: false, annotation: true }
            : { inline: true },
        },
      }),
      new TerserPlugin({ sourceMap: GENERATE_SOURCEMAP }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    process.env.ANALYZE && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
};

module.exports = smp.wrap(merge(baseConfig, prodConfig));
