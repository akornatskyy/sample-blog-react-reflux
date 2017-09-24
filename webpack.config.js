const prod = process.env.NODE_ENV && process.env.NODE_ENV.startsWith('prod');
const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
    new HtmlPlugin({
        template: path.resolve(__dirname, 'src/index.html')
    }),
    new ExtractTextPlugin('css/[name].[contenthash:5].css'),
    new webpack.NoEmitOnErrorsPlugin()
];

if (prod) {
    plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'lib',
            minChunks: Infinity
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        lib: Object.keys(pkg.dependencies),
        app: ['./js/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash:5].js'
    },
    resolve: {
        alias: {
            api: './api/' + (process.env.API || 'mock')
        }
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: /node_modules/,
                include: path.resolve(__dirname, 'src', 'js'),
                query: {
                    presets: ['es2015'],
                    cacheDirectory: true
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /src\/js\/shared\/ajax\.js$/,
                loader: 'string-replace-loader',
                query: {
                    search: 'host = \'\'',
                    replace: 'host = "' + (process.env.HOST || '') + '"',
                    strict: true
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devServer: {
        host: '0.0.0.0',
        compress: true,
        // publicPath: '/sample-blog-react/'
    }
};
