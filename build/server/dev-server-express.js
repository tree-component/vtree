
const path = require('path');
const opn = require('opn');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const config = require('./dev-server.config');
const webpackConfig = require('./webpack.dev.config');

const app = express();
const compiler = webpack(webpackConfig);

// Using the .html extension instead of having to name the views as *.ejs
app.engine('.html', require('ejs').__express);

// This avoids having to provide the extension to res.render()
app.set('view engine', 'html');

// Set the folder where the pages are kept
app.set('views', `${__dirname}../docs`);

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
// noInfo:,
  stats: {
    colors: true,
  },
});
const hotMiddleware = webpackHotMiddleware(compiler, {
  log() {},
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

app.use(devMiddleware); // server webpack bundle output
app.use(hotMiddleware); // enable hot-reload

const baseUrl = `http://localhost:${config.port}`;

const docsRouter = express.Router();

docsRouter.get('/:docs(/:html)', (req, res) => {
  const url = `${req.params.docs}/${req.params.html}`;
  res.render(url, {
    pageTitle: req.params.html,
  });
});

app.use('/docs/', docsRouter);

app.get('/', (req, res) => {
  res.redirect('../examples/tree-xbcx.html');
});

// var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(express.static('./'));

// 在bundle可用的情况下 console.log出正在监听的url;
devMiddleware.waitUntilValid(() => {
  console.log(`正在监听：${baseUrl}\n`);
  opn(baseUrl);
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('==========服务器开启成功=========');
});

