const enableCommonsChunkPlugin = false;
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

const commonEntry = {
    app: ["./src/index.jsx"]
};

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
            filename: "index.html",
            title: "Hello React",
            template: path.join(__dirname, "/src/index.html"),
            favicon: "./favicon.ico"
        }),
        new ExtractTextPlugin("[name].[chunkhash].css")
    ]
};

const productionConfig = {
    entry: getCompleteEntry("production"),
    output: {
        filename: "[name].[chunkhash].js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            sourceMap: true
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
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "build"),
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
