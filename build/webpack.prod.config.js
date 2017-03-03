'use strict';

const path = require('path');
const webpack = require("webpack");

const config = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "tree.js",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader",
                    options: { presets: ["es2015"] }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
        ],
    },
};

module.exports = config;