var config = require('./webpack.base.config');
var path = require('path');

config.entry = '../docs/entry.js';
config.output = {
    filename: '../docs/output.js'
};

module.exports = config;
