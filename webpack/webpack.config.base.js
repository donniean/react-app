const path = require('path');

const dotenvFlow = require('dotenv-flow');
const dotenvExpand = require('dotenv-expand');
const DotenvWebpack = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const WebpackNotifierPlugin = require('webpack-notifier');

const { env, isEnvDevelopment, isEnvProduction } = require('./env');
const {
  nodeModules: nodeModulesPath,
  public: publicPath,
  src: srcPath,
  dist: distPath,
} = require('./paths');

dotenvExpand(dotenvFlow.config());

const getStyleLoaders = () => {
  let [sourceMap, modules] = [true, { auto: true }];

  if (isEnvDevelopment) {
    modules = {
      ...modules,
      localIdentName: '[path][name]__[local]',
    };
  }
  if (isEnvProduction) {
    sourceMap = process.env.GENERATE_SOURCEMAP === 'true';
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
  entry: path.resolve(srcPath, 'index'),
  output: {
    path: distPath,
    publicPath: process.env.PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
        use: getStyleLoaders(),
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
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  target: 'web',
  plugins: [
    new DotenvWebpack({ systemvars: true }),
    new HtmlWebpackPlugin({
      title: process.env.DOCUMENT_TITLE,
      template: path.resolve(publicPath, 'index.handlebars'),
      inject: true,
      favicon: path.resolve(publicPath, 'favicon.png'),
      hash: true,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      context: 'src',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
    }),
    new StylelintPlugin({
      files: 'src/**/*.(css|scss|js|jsx|ts|tsx)',
      fix: true,
    }),
    new WebpackBar(),
    new WebpackNotifierPlugin({ emoji: true }),
  ],
};
