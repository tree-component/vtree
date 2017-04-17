const path = require('path');
const opn = require('opn');
const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require('./dev-server.config');
const webpackConfig = require('./webpack.dev.config');
const Koa = require('koa');
const Router = require('koa-router');

const views = require('koa-views');


const app = new Koa();
const router = new Router();

// 配置模板文件目录和后缀名
const basePath = path.resolve(__dirname, '../');
app.use(views(basePath, {
    extension: 'ejs'
}));

router
    .get('/', ctx => {
        ctx.body = "Hello Koa!"
    })
    .get('/index', ctx => {
        ctx.body = 'Hello index!'
    })
    .get('/index/:name', ctx => {
        ctx.body = 'Hello ' + ctx.params.name + '!'
    })
    .get('/query', ctx => {
        let query = ctx.query;
        let querystring = ctx.querystring;
        ctx.body = 'Hello ' + query.a + 'Hello ' + query.b + ' && ' + querystring + '!';
    })
    .get('/docs/:name', async(ctx) => {
        let url = 'docs/index';
        let title = 'Hello ' + ctx.params.name + '!';
        await ctx.render(url, {
            title
        })
    })

app
    .use(router.routes())
    .use(router.allowedMethods());


var compiler = webpack(webpackConfig);
var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // noInfo:,
    stats: {
        colors: true
    }
});
var hotMiddleware = webpackHotMiddleware(compiler, {
    log: function () {}
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        });
        cb()
    })
});

app.use(devMiddleware); // server webpack bundle output
app.use(hotMiddleware); // enable hot-reload

app.listen(config.port, function (err) {
    if (err) {
        console.log(err);
        return
    }
    console.log('==========服务器开启成功=========');
});


var baseUrl = 'http://localhost:' + config.port;
devMiddleware.waitUntilValid(function () {
    console.log('正在监听：' + baseUrl + '\n');
    opn(baseUrl)
});
