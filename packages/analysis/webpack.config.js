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
        "./test.ts"
    ],
    mode: "development",
    output: {
        path: path.resolve(__dirname, "build"),
        // filename: "index.js",
        libraryTarget: "commonjs2"
    },
    context: path.resolve(__dirname, "src"),
    node: {
        __filename: false,
        __dirname: false
    },
    module: {
        rules: [{
            test: /jquery/,
            use: [
                {
                    loader: 'raw-loader',
                    options: {
                        limit: '1024'
                    }
                },
            ]
        }, {
            test: /\.js$/,
            include: [
                path.join(__dirname, "..", "src")
            ],
            loaders: ["babel-loader"]
        }, {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            }]
        }]
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    target: "node",
    externals: [nodeModules]
};