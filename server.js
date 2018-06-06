const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const webpack = require('webpack');
const config = require('./webpack.config.dev');
const webpackMiddleware = require('koa-webpack');
const render = require('./lib/render.js')
const app = new Koa();

const compiler = webpack(config);

const webpackDevOptions = {
  noInfo: true,
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};



app.use(logger());
app.use(bodyParser());

app.use(webpackMiddleware({
  compiler: compiler,
  config: config,
  dev: webpackDevOptions,
  hot: compiler
}));

router.get('/', async ctx => {
  ctx.body = await render('storytable.html', {});
});

app.use(router.routes());

app.listen(8080)
  .on('listening', () => {
    console.log('Listening 8080');
  });
