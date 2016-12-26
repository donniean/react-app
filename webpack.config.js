var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        "whatwg-fetch",
        "webpack-dev-server/client?http://127.0.0.1:8080",
        "webpack/hot/only-dev-server",
        "./src/index.jsx"
    ],
    output: {
        path: __dirname + "/build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)$/, loaders: ["react-hot-loader", "babel-loader?presets[]=es2015,presets[]=react"], include: path.join(__dirname, "src") },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            { test: /\.(png|jpg)$/, loader: "url-loader?limit=524288" }
        ]
    },
    devtool: "source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ title: "Hello React", template: __dirname + "/src/index.html" }),
        new ExtractTextPlugin("styles.css"),
        // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ]
};
