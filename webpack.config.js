
var path = require('path');
var process = require('process');

var isProduction = process.env.NODE_ENV === 'production';
var buildPath = path.resolve(__dirname, 'public');
var mainPath = path.resolve(__dirname, 'src', 'main.js');

console.log("Is production: " + isProduction);

var entryEnv = isProduction
    ? mainPath
    : [
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://localhost:3333',
        'react-hot-loader/patch',
        mainPath
];

var pluginsEnv = isProduction
    ? ['transform-decorators-legacy']
    : ['transform-decorators-legacy', 'react-hot-loader/babel'];


module.exports = {
    entry: entryEnv,
    output: {
        path: buildPath,
        filename: 'bundle.js',
    },
    debug: true,
    devtool: 'inline-source-map',
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3333
    },
    module: {
        loaders: [
            {
                test: /\.js|.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    plugins: pluginsEnv,
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpg|svg|gif|png)$/,
                loader: 'file?name=img/[name].[ext]',
                include: path.resolve(__dirname, 'src', 'img')
            },
            {
                test: /\.css$/,
                loader: 'style!css?sourceMap!resolve-url',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.sass$/,
                loader: 'style!css!resolve-url!sass?sourceMap',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: 'style!css!resolve-url!sass?sourceMap',
                include: path.resolve(__dirname, 'src')
            }
        ]
    }
};
