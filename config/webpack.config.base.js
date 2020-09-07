const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');

const { prodSourceMap } = require('.');
const { env, isProductionEnv } = require('./env');
const { public: publicPath, src: srcPath, dist: distPath } = require('./paths');

const getStyleLoaders = ({ useCSSModules } = {}) => {
  let sourceMap = true;
  if (isProductionEnv) {
    sourceMap = prodSourceMap;
  }
  return [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap,
        modules: useCSSModules,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
        sourceMap,
        sourceMapContents: sourceMap,
      },
    },
  ];
};

module.exports = {
  mode: env,
  entry: resolve(srcPath, 'index.js'),
  output: {
    path: distPath,
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }],
        include: srcPath,
      },
      {
        test: /\.(handlebars|hbs)$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(sass|scss|css)$/,
        exclude: /\.module\.(sass|scss|css)$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.module\.(sass|scss|css)$/,
        use: getStyleLoaders({ useCSSModules: true }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'assets/images/[name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        include: /\/fonts\//,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [srcPath, resolve('node_modules')],
    alias: {
      '@': srcPath,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React App',
      template: resolve(publicPath, 'index.handlebars'),
      inject: true,
      favicon: resolve(publicPath, 'favicon.png'),
    }),
    // TODO: Not Support Webpack 5
    /* new FaviconsWebpackPlugin({
      logo: resolve(publicPath, 'favicon.png'),
      prefix: 'assets/icons-[hash]/',
    }), */
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new WebpackBar(),
  ],
};
