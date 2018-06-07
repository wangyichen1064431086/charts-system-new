const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const webpack = require('webpack');
const config = require('./webpack.config.dev');
const webpackMiddleware = require('koa-webpack');
//const render = require('./lib/render.js')
const nunjucks = require('nunjucks');

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

var env = new nunjucks.Environment( //也就是起到了'koa-views'的作用
  new nunjucks.FileSystemLoader(
    [
      path.resolve(__dirname, 'views'),
      path.resolve(__dirname, 'views/pages')
    ],
    {
      watch:false,
      noCache: true
    }
  ),
  {autoescape: false}
);
function render(template, context) {
  return new Promise(function(resolve, reject) {
    env.render(template, context, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

app.use(logger());
app.use(bodyParser());

app.use(webpackMiddleware({
  compiler: compiler,
  config: config,
  dev: webpackDevOptions,
  hot: compiler
}));

router.get('/', async ctx => {
  const htmlResult = await render('storytable.html', {
    nodeEnv:'dev'
  });
  ctx.body = htmlResult;
});

app.use(router.routes());

app.listen(8080)
  .on('listening', () => {
    console.log('Listening 8080');
  });
