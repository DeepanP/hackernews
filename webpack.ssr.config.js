const path = require("path");
const nodeExternal = require("webpack-node-externals");

const config = {
    mode: 'development',
    target: "node",
    entry: {
        server: ['./src/server.js']
    },
    output: {
        path: path.resolve(__dirname,"build"),
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
            }
        ]
    },
    resolve: {
        extensions: [".js",".jsx"]
    },
    externals: [nodeExternal()]
};

module.exports =config;