
var path = require('path');
var opn  = require('opn');
var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var koa = require('koa');
var config = require('./dev-server.config');
var webpackConfig = require('./webpack.dev.config');

const app = new Koa();
// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);

var compiler = webpack(webpackConfig);


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































