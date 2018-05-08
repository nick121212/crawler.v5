const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const nodeModules = {};

fs.readdirSync("node_modules")
    .filter(function (x) {
        return [".bin"].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = "commonjs " + mod;
    });

module.exports = {
    entry: [
        "./index.ts"
    ],
    mode: "development",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js",
        libraryTarget: "commonjs2"
    },
    context: path.resolve(__dirname, "src"),
    node: {
        __filename: false,
        __dirname: false
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: [
                path.resolve(__dirname, "node_modules"),
                path.resolve(__dirname, "build"),
            ],
            loaders: ["babel-loader", "ts-loader"]
        }, {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: [
                path.resolve(__dirname, "node_modules"),
                path.resolve(__dirname, "build"),
            ]
        }, {
            test: /\.json$/,
            loader: "json-loader"
        }]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    target: "node",
    externals: [nodeModules]
};