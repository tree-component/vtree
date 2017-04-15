'use strict';

const path = require('path');
const webpack = require("webpack");

const config = {
    watch: true,
    context: path.resolve(__dirname, '../'),
    entry: {
        'tree-vue': "./src/components/tree-vue/index.js",
        'tree-xbcx': "./src/components/tree-xbcx/index.js"
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
    },
    // devtool: "source-map",
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