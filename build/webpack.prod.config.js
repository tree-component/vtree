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
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
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