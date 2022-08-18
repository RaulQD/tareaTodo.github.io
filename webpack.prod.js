const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');



module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/i,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
                loader: 'file-loader'
            }

        ],
    },
    devServer: {
        open: true,
        port: 8080,
        client: {
            overlay: true,
        },
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Webpack App',
        template: 'src/index.html'
    }), new MiniCssExtractPlugin({
        filename: '[name][contenthash].css',
        ignoreOrder: false,
    }),
    new CopyPlugin({
        patterns: [
            { from: 'src/assets', to: "assets/" }
        ]
    })],
}