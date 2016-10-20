var path = require('path');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3333',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './src/main.js'
    ],
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'bundle.js',
    },
    debug: true,
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3333
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    plugins: ['transform-decorators-legacy', 'react-hot-loader/babel'],
                    presets: ['react', 'es2015', 'stage-2']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.svg$/,
                loader: 'file',
                include: path.resolve(__dirname, './src/img')
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'file?name=[path][name].[hash].[ext]',
                include: path.resolve(__dirname, './src/img')
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loader: 'css-loader!sass-loader'
            }
        ]
    }
};
