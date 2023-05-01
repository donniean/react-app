const path = require('node:path');

const config = require('config');
const dotenvExpand = require('dotenv-expand');
const dotenvFlow = require('dotenv-flow');
const DotenvWebpack = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { DefinePlugin } = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
/* cspell: disable-next-line */
const WebpackBar = require('webpackbar');

const {
  env,
  isEnvDevelopment,
  isEnvProduction,
} = require('../scripts/utils/env.cjs');
const paths = require('../scripts/utils/paths.cjs');

const publicPath = config?.publicPath;
const documentTitle = config?.client?.documentTitle;
const generateSourcemap = config?.builder?.generateSourcemap;

dotenvExpand.expand(dotenvFlow.config());

const getStyleLoaders = ({ type } = {}) => {
  let [sourceMap, modules] = [true, { auto: true }];

  if (isEnvDevelopment) {
    modules = {
      ...modules,
      localIdentName: '[path][name]__[local]',
    };
  }
  if (isEnvProduction) {
    sourceMap = !!generateSourcemap;
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
    ['sass', 'scss'].includes(type) && {
      loader: 'sass-loader',
      options: {
        sourceMap,
      },
    },
    type === 'less' && {
      loader: 'less-loader',
      options: {
        sourceMap,
      },
    },
  ].filter(Boolean);
};

const contenthash = '[contenthash]';

module.exports = {
  mode: env,
  entry: path.resolve(paths.src, 'index'),
  output: {
    path: paths.dist,
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: paths.src,
        exclude: paths.nodeModules,
        loader: 'babel-loader',
      },
      {
        test: /\.(handlebars|hbs)$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.(sass|scss)$/,
        use: getStyleLoaders({ type: 'sass' }),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders({ type: 'less' }),
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset',
        generator: {
          filename: `assets/images/[name]${
            isEnvProduction ? contenthash : ''
          }[ext][query]`,
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            issuer: /\.(js|jsx|ts|tsx)$/i,
            resourceQuery: /svgr/,
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  prettier: false,
                  svgo: false,
                  svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                  },
                  titleProp: true,
                  ref: true,
                },
              },
            ],
          },
          {
            type: 'asset',
            generator: {
              filename: `assets/images/[name]${
                isEnvProduction ? contenthash : ''
              }[ext][query]`,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        include: /\/fonts\//,
        generator: {
          filename: `assets/fonts/[name]${
            isEnvProduction ? contenthash : ''
          }[ext][query]`,
        },
      },
    ],
  },
  resolve: {
    modules: [paths.nodeModules, paths.src],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  target: 'web',
  plugins: [
    /* cspell: disable-next-line */
    new DotenvWebpack({ systemvars: true }),
    new HtmlWebpackPlugin({
      title: documentTitle,
      template: path.resolve(paths.public, 'index.handlebars'),
      inject: true,
      favicon: path.resolve(paths.public, 'favicon.svg'),
      hash: true,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new DefinePlugin({ GLOBALS: JSON.stringify(config) }),
    new ESLintPlugin({
      context: 'src',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
      emitWarning: false,
    }),
    new StylelintPlugin({
      context: 'src',
      extensions: ['css', 'scss', 'js', 'jsx', 'ts', 'tsx'],
      fix: true,
    }),
    new WebpackBar(),
    new WebpackNotifierPlugin({ emoji: true }),
  ],
};
