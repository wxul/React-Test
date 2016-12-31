var webpack = require('webpack');
var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var APP_FILE = path.resolve(APP_PATH, 'app');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist/script');

module.exports = {
    entry: {
        app: APP_FILE
    },
    output: {
        publicPath: '/',
        path: DIST_PATH,
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
            loader: 'file-loader?name=../img/[name].[hash:8].[ext]'
        }]

    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}