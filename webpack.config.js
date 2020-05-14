const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    mode: 'development',
    plugins:[ 
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin([
            {
            from: 'src/main.css',
            to: path.resolve(__dirname, 'public')
            } 
        ])
    ],
    entry: {
        vendor: ["@babel/polyfill", "react"],
        app: ['./src/client.js']
    },
    output: {
        path: path.resolve(__dirname,"public"),
        filename: "[name].js"
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: [".js",".jsx"]
    }
};

module.exports =config;