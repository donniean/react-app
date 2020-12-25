const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

const {
  PUBLIC_PATH,
  GENERATE_SOURCEMAP,
  DOCUMENT_TITLE,
} = require('./constants');
const { env, isEnvDevelopment, isEnvProduction } = require('./env');
const {
  nodeModules: nodeModulesPath,
  public: publicPath,
  src: srcPath,
  dist: distPath,
} = require('./paths');

const getStyleLoaders = ({ useCSSModules } = {}) => {
  let sourceMap = true;
  let modules = false;
  if (isEnvProduction) {
    sourceMap = GENERATE_SOURCEMAP;
  }
  if (useCSSModules) {
    if (isEnvDevelopment) {
      modules = {
        localIdentName: '[path][name]__[local]',
      };
    }
    if (isEnvProduction) {
      modules = true;
    }
  }

  return [
    isEnvDevelopment && 'style-loader',
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
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
  ].filter(Boolean);
};

module.exports = {
  mode: env,
  entry: resolve(srcPath, 'index'),
  output: {
    path: distPath,
    publicPath: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        exclude: nodeModulesPath,
        loader: 'babel-loader',
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
        type: 'asset',
        generator: {
          filename: `assets/images/[name].${
            isEnvProduction ? '[contenthash]' : ''
          }[ext][query]`,
        },
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        type: 'asset/resource',
        include: /\/fonts\//,
        generator: {
          filename: `assets/fonts/[name].${
            isEnvProduction ? '[contenthash]' : ''
          }[ext][query]`,
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
  stats: 'errors-warnings',
  plugins: [
    new HtmlWebpackPlugin({
      title: DOCUMENT_TITLE,
      template: resolve(publicPath, 'index.handlebars'),
      inject: true,
      favicon: resolve(publicPath, 'favicon.png'),
      hash: true,
    }),
    new ESLintPlugin({
      context: 'src',
      extensions: ['js', 'jsx'],
      fix: true,
    }),
    new StylelintPlugin({ files: 'src/**/*.(css|scss|js|jsx)', fix: true }),
    new WebpackBar(),
    new WebpackNotifierPlugin({ emoji: true }),
    new CleanTerminalPlugin(),
  ],
};
