

const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.resolve(__dirname, '../'),
  entry: {
    'tree-vue': './src/tree-vue/index.js',
    'tree-xbcx': './src/tree-xbcx/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
    // devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
};

module.exports = config;
