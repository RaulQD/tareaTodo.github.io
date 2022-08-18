const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');



module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'docs'),
        clean: true
    },
    module: {
        rules: [
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
        watchFiles: ["src/*.html"],
        hot: true,
        open: true,
        port: 8080,
        client: {
            overlay: true,
        },
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Webpack App',
        template: 'src/index.html'
    }), new MiniCssExtractPlugin({
        filename: '[name].css',
        ignoreOrder: false,
    }),
    new CopyPlugin({
        patterns: [
            { from: 'src/assets', to: "assets/" }
        ]
    })],
}