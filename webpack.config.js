/**
 *
 * TODO:
 *
 * devServer, HotModuleReplacementPlugin, react-hot-loader, module.hot.accept
 * OptimizeCSSAssetsPlugin, cssnano
 *
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');

const { prodSourceMap, htmlList } = require('./config');

const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
const devMode = env === 'development';
const prodMode = env === 'production';

/**
 *
 * output
 *
 * { app: './src/index.js' }
 *
 */
const commonEntry = (() => {
    let commonEntry = {};
    for (const html of htmlList) {
        const name = html.name;
        const filename = html.filename;
        commonEntry[name] = './src/' + filename + '.js';
    }
    return commonEntry;
})();

/**
 *
 * output
 *
 * {
 *   "app": [
 *     "@babel/polyfill",
 *     "./src/index.js"
 *   ]
 * }
 *
 */
const entry = (() => {
    let entry = {};
    for (const key in commonEntry) {
        let value = commonEntry[key];
        value = ['@babel/polyfill'].concat(value);
        entry[key] = value;
    }
    return entry;
})();

const HtmlWebpackPluginList = (() => {
    let list = [];
    const minify = prodMode
        ? {
              collapseWhitespace: true,
              minifyCSS: true,
              minifyJS: true,
              removeComments: true
          }
        : false;
    for (const html of htmlList) {
        const title = html.title;
        const filename = html.filename;
        const template = html.template;
        const name = html.name;
        list.push(
            new HtmlWebpackPlugin({
                title: title,
                filename: filename + '.html',
                template: path.join(
                    __dirname,
                    '/src/templates/' + template + '.ejs'
                ),
                minify: minify,
                chunks: ['vendor', name]
            })
        );
    }
    return list;
})();

const styleRule = (() => {
    let sourceMap = true;
    prodMode && (sourceMap = prodSourceMap);
    const rule = {
        test: /\.(css|scss)$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            /* {
                loader: 'style-loader',
                options: {
                    sourceMap: sourceMap
                }
            }, */
            {
                loader: 'css-loader',
                options: {
                    sourceMap: sourceMap
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: sourceMap
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    outputStyle: 'expanded',
                    sourceMap: sourceMap,
                    sourceMapContents: sourceMap
                }
            }
        ]
    };
    return rule;
})();

const commonConfig = {
    mode: env,
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', ':data-src'],
                            interpolate: true
                        }
                    }
                ]
            },
            styleRule,
            {
                test: /\.(js|jsx)$/,
                use: [{ loader: 'babel-loader' }],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'assets/images/[name].[hash].[ext]'
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: HtmlWebpackPluginList.concat([
        new FaviconsWebpackPlugin({
            logo: './src/assets/images/logo.png',
            prefix: 'assets/icons-[hash]/'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        })
    ])
};

const devConfig = {
    output: {
        filename: 'js/[name].[hash].js'
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '0.0.0.0',
        hot: true,
        port: 8080
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};

const prodConfig = {
    output: {
        filename: 'js/[name].[chunkhash].js'
    },
    devtool: prodSourceMap ? 'source-map' : false,
    // https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/53
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: prodSourceMap
                        ? {
                              inline: false,
                              annotation: true
                          }
                        : { inline: true }
                }
            }),
            new UglifyJsPlugin({ sourceMap: prodSourceMap })
        ]
    },
    plugins: [new CleanWebpackPlugin(['dist'])]
};

module.exports = () => {
    let config = null;
    if (devMode) {
        config = webpackMerge(commonConfig, devConfig);
    } else if (prodMode) {
        config = webpackMerge(commonConfig, prodConfig);
    }
    return config;
};
