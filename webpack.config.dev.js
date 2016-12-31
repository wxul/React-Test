var webpack = require('webpack');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
//var APP_FILE = path.resolve(APP_PATH, 'app');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');
console.log(DIST_PATH);
module.exports = {
    entry: {
        app: [
            'webpack-dev-server/client?http://127.0.0.1:8888/',
            'webpack/hot/only-dev-server',
            './src/app.jsx'
        ]
    },
    output: {
        publicPath: 'http://127.0.0.1:8888/dist/',
        path: '/dist',
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].min.js'
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /^node_modules$/,
            loader: 'babel',
            query: {
                presets: ['react', 'latest']
            }
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            loader: 'style!css'
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            loader: 'style!css!less'
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            loader: 'url-loader?limit=8192&name=../img/[name].[hash:8].[ext]'
        }]

    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}