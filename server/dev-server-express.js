
var path = require('path');
var opn  = require('opn');
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var express = require('express');
var config = require('../config/dev-server.config');
var webpackConfig = require('../build/webpack.dev.config');

var app = express();
var compiler = webpack(webpackConfig);

// Using the .html extension instead of having to name the views as *.ejs
app.engine('.html', require('ejs').__express);

// This avoids having to provide the extension to res.render()
app.set('view engine', 'html');

// Set the folder where the pages are kept
app.set('views', __dirname + '../docs');

var devMiddleware = webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	// noInfo:,
	stats: {
		colors: true
	}
});
var hotMiddleware = webpackHotMiddleware(compiler, {
	log: function(){}
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({ action: 'reload' });
		cb()
	})
});

app.use(devMiddleware); // server webpack bundle output
app.use(hotMiddleware); // enable hot-reload

var baseUrl = 'http://localhost:' + config.port;

var docsRouter = express.Router();

docsRouter.get('/:docs(/:html)', function(req, res){
	var url = req.params.docs + '/' + req.params.html;
    res.render(url, {
        pageTitle: req.params.html
    });
});

app.use('/docs/', docsRouter);

app.get('/', function(req, res){
	res.redirect('../examples/tree-xbcx.html');
});

// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(express.static('./'));

// 在bundle可用的情况下 console.log出正在监听的url;
devMiddleware.waitUntilValid(function () {
	console.log('正在监听：' + baseUrl + '\n');
	opn(baseUrl)
});

app.listen(config.port, function (err) {
	if(err) {
		console.log(err);
		return
	}
	console.log('==========服务器开启成功=========');
});































