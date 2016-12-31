var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');
var port = 8888;

var server = new webpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true
});

server.listen(port, function(err, res) {
    err && console.log(err);
    console.log('listening at port: %s', port);
});