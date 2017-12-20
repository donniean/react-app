/**
 * User Config
 */
const enableCommonsChunkPlugin = false;
const enableSourceMap = false;
const pageList = [{
    name: 'app', // 输出的js文件名
    filename: 'index', // 输入的jsx文件名，输出的html文件名
    template: 'index' // 模板名
}];

/**
 * Webpack Config
 */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')({ browsers: ['last 100 versions', '> 1%'] });
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js'
});

const commonEntry = (() => {
    let commonEntry = {};
    for (const page of pageList) {
        const name = page.name;
        const filename = page.filename;
        commonEntry[name] = './src/' + filename + '.jsx';
    }
    return commonEntry;
})();

const publicPath = '/';

const getCompleteEntry = env => {
    let entry = {};
    for (const key in commonEntry) {
        let value = commonEntry[key];
        value = ['babel-polyfill'].concat(value);
        if (env === 'development') {
            value = [
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://127.0.0.1:8080',
                'webpack/hot/only-dev-server'
            ].concat(value);
        }
        entry[key] = value;
    }
    return entry;
};

const getModule = env => {
    let sourceMap = true;
    if (env === 'production') {
        sourceMap = enableSourceMap;
    }
    const module = {
        rules: [{
            test: /\.(css|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: sourceMap
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: sourceMap,
                        plugins: [autoprefixer]
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        outputStyle: 'expanded',
                        sourceMap: sourceMap,
                        sourceMapContents: sourceMap
                    }
                }]
            })
        }]
    };
    return module;
};

const HtmlWebpackPluginList = (() => {
    let list = [];
    for (const page of pageList) {
        const name = page.name;
        const filename = page.filename;
        const title = page.title || '';
        const template = page.template;
        list.push(
            new HtmlWebpackPlugin({
                filename: filename + '.html',
                template: path.join(__dirname, '/src/templates/' + template + '.html'),
                favicon: './favicon.ico',
                minify: {
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true
                },
                chunks: ['vendor', name]
            })
        );
    }
    return list;
})();

const commonConfig = {
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(html)$/,
            use: [{
                loader: 'html-loader',
                options: {
                    attrs: ['img:src', ':data-src'],
                    interpolate: true
                }
            }]
        }, {
            test: /\.(js|jsx)$/,
            use: [{ loader: 'babel-loader' }],
            include: path.join(__dirname, 'src')
        }, {
            test: /\.(png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[hash].[ext]',
                    publicPath: './'
                }
            }
        }, {
            test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
            use: {
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[hash].[ext]',
                    publicPath: './'
                }
            }
        }]
    },
    plugins: HtmlWebpackPluginList.concat([
        new ExtractTextPlugin('[name].[chunkhash].css')
    ])
};

const productionConfig = {
    entry: getCompleteEntry('production'),
    output: {
        filename: '[name].[chunkhash].js'
    },
    module: getModule('production'),
    devtool: enableSourceMap ? 'source-map' : false,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            sourceMap: enableSourceMap
        }),
        new webpack.LoaderOptionsPlugin({ minimize: true }),
        new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
        new CleanWebpackPlugin(['dist']),
    ]
};

const developmentConfig = {
    entry: getCompleteEntry('development'),
    output: {
        filename: '[name].[hash].js',
        publicPath: publicPath
    },
    module: getModule('development'),
    devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: publicPath
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};

module.exports = env => {
    let config = null;
    enableCommonsChunkPlugin && commonConfig.plugins.push(CommonsChunkPlugin);
    if (env === 'production') {
        config = webpackMerge(commonConfig, productionConfig);
    } else {
        config = webpackMerge(commonConfig, developmentConfig);
    }
    return config;
};
