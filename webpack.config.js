const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const plugins = [
    new HtmlPlugin({
        template: path.resolve(__dirname, 'src/index.html')
    }),
];


module.exports = (_, argv) => {
    const devMode = argv.mode !== 'production';
    if (!devMode) {
        plugins.push(
            new MiniCssExtractPlugin({filename: 'css/[name].[chunkhash:5].css'})
        );
    }

    return {
        mode: argv.mode ? argv.mode : 'development',
        context: path.resolve(__dirname, 'src'),
        entry: {
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
        devtool: devMode ? 'source-map' : undefined,
        plugins: plugins,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    lib: {
                        name: 'lib',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/]/
                    }
                }
            },
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                })
            ],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: path.resolve(__dirname, 'src', 'js')
                },
                {
                    test: /\.scss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: path.join(__dirname, 'src/js/shared/ajax.js'),
                    loader: 'string-replace-loader',
                    options: {
                        search: 'host = \'\'',
                        replace: 'host = "' + (process.env.HOST || '') + '"',
                        strict: true
                    }
                }
            ]
        },
        devServer: {
            host: '0.0.0.0',
            compress: true
        }
    };
};
