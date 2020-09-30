const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

const { GENERATE_SOURCEMAP } = require('./constants');
const baseConfig = require('./webpack.config.base');

// const smp = new SpeedMeasurePlugin();

const prodConfig = {
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
  },
  devtool: GENERATE_SOURCEMAP ? 'source-map' : false,
  optimization: {
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
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].chunk.css',
    }),
    process.env.ANALYZE && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
};

// TODO: SpeedMeasurePlugin & Webpack 5
// module.exports = smp.wrap(merge(baseConfig, prodConfig));
module.exports = merge(baseConfig, prodConfig);
