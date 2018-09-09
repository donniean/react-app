/**
 *
 * TODO:
 *
 * loaders
 * plugins
 * publicPath
 * guide
 *
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');

const { prodSourceMap, publicPath, pageList } = require('./config');

const env = process.env.NODE_ENV && process.env.NODE_ENV.trim();
const devMode = env === 'development';
const prodMode = env === 'production';

/**
 * output
 *
 * { app: './src/index.jsx' }
 *
 */
const commonEntry = (() => {
    let commonEntry = {};
    for (const page of pageList) {
        const name = page.name;
        const filename = page.filename;
        commonEntry[name] = './src/' + filename + '.jsx';
    }
    return commonEntry;
})();

/**
 *
 * output
 *
 *
 * development
 *
 * {
 *   "app": [
 *     "react-hot-loader/patch",
 *     "webpack-dev-server/client?http://127.0.0.1:8080",
 *     "webpack/hot/only-dev-server",
 *     "@babel/polyfill",
 *     "./src/index.jsx"
 *   ]
 * }
 *
 *
 * production
 *
 * { app: [ '@babel/polyfill', './src/index.jsx' ] }
 *
 */
const entry = (() => {
    let entry = {};
    for (const key in commonEntry) {
        let value = commonEntry[key];
        value = ['@babel/polyfill'].concat(value);
        devMode &&
            (value = [
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://127.0.0.1:8080',
                'webpack/hot/only-dev-server'
            ].concat(value));

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
    for (const page of pageList) {
        const title = page.title;
        const filename = page.filename;
        const template = page.template;
        const name = page.name;
        list.push(
            new HtmlWebpackPlugin({
                title: title,
                filename: filename + '.html',
                template: path.join(
                    __dirname,
                    '/src/templates/' + template + '.ejs'
                ),
                favicon: './favicon.ico',
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
                        name: 'images/[name].[hash].[ext]',
                        publicPath: './'
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        publicPath: './'
                    }
                }
            }
        ]
    },
    plugins: HtmlWebpackPluginList.concat([
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ])
};

const devConfig = {
    output: {
        filename: '[name].[hash].js',
        publicPath: publicPath
    },
    // TODO: source-map
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: publicPath
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};

const prodConfig = {
    output: {
        filename: '[name].[chunkhash].js'
    },
    devtool: prodSourceMap ? 'source-map' : false,
    // https://github.com/NMFR/optimize-css-assets-webpack-plugin/issues/53
    optimization: {
        minimizer: [
            // TODO: cssnano
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
