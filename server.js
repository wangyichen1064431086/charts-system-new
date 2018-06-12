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
const headerWebData = require('./data/webData');
const headerIphoneData = require('./data/iPhoneData');
const headerAndroidData = require('./data/androidData');

console.log(headerWebData);
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
      path.resolve(__dirname, 'views/pages'),
      path.resolve(__dirname, 'views/partials')
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

router.get('/iphoneapp', async ctx => {
  const htmlResult = await render('storytable-iphoneapp.html', {
    nodeEnv:'dev',
    jsFile:'storyTableiPhone',
    header:headerIphoneData
  });
  ctx.body = htmlResult;
});

router.get('/androidapp', async ctx => {
  const htmlResult = await render('storytable-androidapp.html', {
    nodeEnv:'dev',
    jsFile:'storyTableAndroid',
    header:headerAndroidData
  });
  ctx.body = htmlResult;
});

router.get('/web', async ctx => {
  const htmlResult = await render('storytable-web.html', {
    nodeEnv:'dev',
    jsFile:'storyTableWeb',
    header:headerWebData
  });
  ctx.body = htmlResult;
});

app.use(router.routes());

app.listen(8080)
  .on('listening', () => {
    console.log('Listening 8080');
  });
