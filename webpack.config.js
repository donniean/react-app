/**
 * User Config
 */
const enableCommonsChunkPlugin = false;
const enableSourceMap = false;
const pageList = [{
    name: "app", // 输出的js文件名
    filename: "index", // 输入的jsx文件名，输出的html文件名
    title: "" // 输出的html的title
}];

/**
 * Webpack Config
 */
const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer")({ browsers: ["last 100 versions", "> 1%"] });
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackMerge = require("webpack-merge");
const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.js"
});

const commonEntry = (function() {
    let commonEntry = {};
    for (const page of pageList) {
        const name = page.name;
        const filename = page.filename;
        commonEntry[name] = "./src/" + filename + ".jsx";
    }
    return commonEntry;
})();

const publicPath = "/";

const getCompleteEntry = function(env) {
    let entry = {};
    for (const key in commonEntry) {
        let value = commonEntry[key];
        value = ["babel-polyfill"].concat(value);
        if (env === "development") {
            value = [
                "react-hot-loader/patch",
                "webpack-dev-server/client?http://127.0.0.1:8080",
                "webpack/hot/only-dev-server"
            ].concat(value);
        }
        entry[key] = value;
    }
    return entry;
};

const HtmlWebpackPluginList = (function() {
    let list = [];
    for (const page of pageList) {
        const name = page.name;
        const filename = page.filename;
        const title = page.title || "";
        list.push(
            new HtmlWebpackPlugin({
                filename: filename + ".html",
                title: title,
                template: path.join(__dirname, "/src/templates/index.html"),
                favicon: "./favicon.ico",
                chunks: ["vendor", name],
                minify: {
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true
                }
            })
        );
    }
    return list;
})();

const commonConfig = {
    output: {
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [{
                loader: "babel-loader",
                query: {
                    presets: [
                        ["es2015", { "modules": false }],
                        "react"
                    ]
                }
            }],
            include: path.join(__dirname, "src")
        }, {
            test: /\.(png|jpg)$/,
            use: {
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "images/[name].[hash].[ext]",
                    publicPath: "../"
                }
            }
        }]
    },
    plugins: HtmlWebpackPluginList.concat([
        new ExtractTextPlugin("[name].[chunkhash].css")
    ])
};

const productionConfig = {
    entry: getCompleteEntry("production"),
    output: {
        filename: "[name].[chunkhash].js"
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        sourceMap: enableSourceMap
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: enableSourceMap,
                        plugins: function() {
                            return [autoprefixer];
                        }
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        outputStyle: "expanded",
                        sourceMap: enableSourceMap,
                        sourceMapContents: enableSourceMap
                    }
                }]
            })
        }]
    },
    devtool: enableSourceMap ? "source-map" : false,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            sourceMap: enableSourceMap
        }),
        new webpack.LoaderOptionsPlugin({ minimize: true }),
        new webpack.DefinePlugin({ "process.env": { "NODE_ENV": JSON.stringify("production") } })
    ]
};

const developmentConfig = {
    entry: getCompleteEntry("development"),
    output: {
        filename: "[name].[hash].js",
        publicPath: publicPath
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true,
                        plugins: function() {
                            return [autoprefixer];
                        }
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        outputStyle: "expanded",
                        sourceMap: true,
                        sourceMapContents: true
                    }
                }]
            })
        }]
    },
    devtool: "source-map",
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: publicPath
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};

module.exports = function(env) {
    let config = null;
    enableCommonsChunkPlugin && commonConfig.plugins.push(CommonsChunkPlugin);
    if (env === "production") {
        config = webpackMerge(commonConfig, productionConfig);
    } else {
        config = webpackMerge(commonConfig, developmentConfig);
    }
    return config;
};
