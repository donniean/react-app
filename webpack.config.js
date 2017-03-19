const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer")({ browsers: ["last 100 versions", "> 1%"] });
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackMerge = require("webpack-merge");

const commonEntry = ["babel-polyfill", "./src/index.jsx"];
const publicPath = "/";

const commonConfig = {
    output: {
        path: path.resolve(__dirname, "build")
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
        }, {
            test: /\.(png|jpg)$/,
            use: {
                loader: "url-loader",
                options: { limit: 524288 }
            }
        }]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Hello React",
            template: path.join(__dirname, "/src/index.html")
        })
    ]
};

const productionConfig = {
    entry: commonEntry,
    output: {
        filename: "bundle.min.[chunkhash].js"
    },
    plugins: [
        new ExtractTextPlugin("styles.min.[chunkhash].css"),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            sourceMap: true
        }),
        new webpack.LoaderOptionsPlugin({ minimize: true }),
        new webpack.DefinePlugin({ "process.env": { "NODE_ENV": JSON.stringify("production") } })
    ]
};

const developmentConfig = {
    output: {
        publicPath: publicPath
    },
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://127.0.0.1:8080",
        "webpack/hot/only-dev-server"
    ].concat(commonEntry),
    output: {
        filename: "bundle.[hash].js"
    },
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "build"),
        publicPath: publicPath
    },
    plugins: [
        new ExtractTextPlugin("styles.[hash].css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};

module.exports = function(env) {
    let config = null;
    if (env === "production") {
        config = webpackMerge(commonConfig, productionConfig);
    } else {
        config = webpackMerge(commonConfig, developmentConfig);
    }
    return config;
};
