const path = require('path');
const opn = require('opn');
const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require('../build/webpack.dev.config');
const config = require('../config/dev-server.config');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger')
const serve = require('koa-static')
const views = require('koa-views');

//app
const app = new Koa();

// 配置模板文件目录和后缀名
const basePath = path.resolve(__dirname, '../');
app.use(views(basePath, {
    // extension: 'ejs'
    map: {
        html: 'ejs'
    }
}));

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = path.resolve(__dirname, '../dist')
app.use(serve(staticPath))

//logger
app.use(logger());

//router
const indexRouter = new Router();
indexRouter
    .get('/', ctx => {
        ctx.body = "Hello Koa2!"
    })
    .get('index', ctx => {
        ctx.body = 'Hello index!'
    })
    .get('index/:name', ctx => {
        ctx.body = 'Hello ' + ctx.params.name + '!'
    })
    .get('query', ctx => {
        let query = ctx.query;
        let querystring = ctx.querystring;
        ctx.body = 'Hello ' + query.a + ' Hello ' + query.b + ' && ' + querystring + ' !';
    })
//docs router
var docsRouter = new Router();
// docsRouter.prefix('/docs')
docsRouter.get('/:name', async(ctx) => {
    let url = 'docs/index';
    let title = 'Hello ' + ctx.params.name + '!';
    await ctx.render(url, {
        title
    })
}).get('/', async(ctx, next) => {
    ctx.body = 'docs'
})
//demo router
var demoRouter = new Router();
demoRouter.get('/:demo', async(ctx, next) => {
    let url = 'examples/' + ctx.params.demo;
    await ctx.render(url)
}).get('/', async(ctx, next) => {
    ctx.body = 'demo'
})

//dist router
var distRouter = new Router();
distRouter.get('/:dist', async(ctx, next) => {
    let url = 'dist/' + ctx.params.dist;
    await ctx.render(url)
})
// 装载所有子路由
let router = new Router()
router.use('/', indexRouter.routes(), indexRouter.allowedMethods())
router.use('/docs', docsRouter.routes(), docsRouter.allowedMethods())
router.use('/demo', demoRouter.routes(), demoRouter.allowedMethods())
router.use('/dist', distRouter.routes(), distRouter.allowedMethods())
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());


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


var uri = 'http://localhost:' + config.port + '/demo/tree-xbcx';
devMiddleware.waitUntilValid(function () {
    console.log('正在监听：' + uri + '\n');
    opn(uri)
});