var ip = "127.0.0.1";
var port = 8080;
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config");
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    noInfo: true,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
    clientLogLevel: "error" // error, warning, info or none
}).listen(port, ip, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log("Listening at " + ip + ":" + port);
});
