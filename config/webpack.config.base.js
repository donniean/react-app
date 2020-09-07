const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
  entry: [resolve(srcPath, 'index.js')],
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
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', ':data-src'],
              interpolate: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: getStyleLoaders({ useCSSModules: true }),
      },
      {
        test: /\.(png|jpe?g|gif)$/,
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
    alias: {
      '@': srcPath,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React App',
      filename: 'index.html',
      template: resolve(publicPath, 'index.ejs'),
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
      chunks: ['vendor', 'app'],
    }),
    new FaviconsWebpackPlugin({
      logo: resolve(publicPath, 'favicon.png'),
      prefix: 'assets/icons-[hash]/',
      title: 'React App',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
  ],
};
