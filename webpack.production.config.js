var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ["whatwg-fetch", "./src/index.jsx"],
    output: {
        path: __dirname + "/build/",
        filename: "bundle.min.js"
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loaders: ["react-hot-loader", "babel-loader?presets[]=es2015,presets[]=react"], include: path.join(__dirname, "src") },
            { test: /\.(css|scss)$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true") },
            { test: /\.(png|jpg)$/, loader: "url-loader?limit=524288" }
        ]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({ title: "Hello React", template: __dirname + "/src/index.html" }),
        new ExtractTextPlugin("styles.min.css"),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
        new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production") } }),
    ]
};
