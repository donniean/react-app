const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const { GENERATE_SOURCEMAP } = require('./constants');
const { env, isDevelopmentEnv, isProductionEnv } = require('./env');
const {
  nodeModules: nodeModulesPath,
  public: publicPath,
  src: srcPath,
  dist: distPath,
} = require('./paths');

const getStyleLoaders = ({ useCSSModules } = {}) => {
  let sourceMap = true;
  let modules = false;
  if (isProductionEnv) {
    sourceMap = GENERATE_SOURCEMAP;
  }
  if (useCSSModules) {
    if (isDevelopmentEnv) {
      modules = {
        localIdentName: '[path][name]__[local]',
      };
    }
    if (isProductionEnv) {
      modules = true;
    }
  }

  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDevelopmentEnv,
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap,
        modules,
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
        sourceMap,
      },
    },
  ];
};

module.exports = {
  mode: env,
  entry: resolve(srcPath, 'index'),
  output: {
    path: distPath,
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: nodeModulesPath,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        exclude: nodeModulesPath,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [isDevelopmentEnv && 'react-refresh/babel'].filter(
                Boolean
              ),
            },
          },
        ],
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
            limit: 1024 * 10,
            name: 'assets/images/[name].[contenthash].[ext]',
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
    modules: [nodeModulesPath, srcPath],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': srcPath,
    },
  },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React App',
      template: resolve(publicPath, 'index.handlebars'),
      inject: true,
      favicon: resolve(publicPath, 'favicon.png'),
      hash: true,
    }),
    new StylelintPlugin({ files: 'src/**/*.(css|scss|js|jsx)', fix: true }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    // TODO: WebpackBar & Webpack 5
    new WebpackBar(),
    new FriendlyErrorsWebpackPlugin(),
  ],
};
