const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const webpack = require('webpack');
const config = require('./webpack.config.dev');
const webpackMiddleware = require('koa-webpack');
//const render = require('./lib/render.js')
const nunjucks = require('nunjucks');
const jetpack = require('fs-jetpack');

const headerAllData = require('./data/storyTableAll');
const headerIphoneData = require('./data/storyTableiPhone');
const headerAndroidData = require('./data/storyTableAndroid');
const headerWebData = require('./data/storyTableWeb');

const app = new Koa();
const nodeEnv = process.env.NODE_ENV || '';
console.log(`nodeEnv: ${nodeEnv}`);

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

const router = new Router();

const paidStoryRouter = new Router();
const adMonitorRouter = new Router();
const userPyramidRouter = new Router();

//paidStoryRouter
paidStoryRouter.get('/iphoneapp', async ctx => {
  const htmlResult = await render('storytable-iphoneapp.html', {
    nodeEnv:nodeEnv,
    jsFile:'storyTableiPhone',
    header:headerIphoneData
  });
  ctx.body = htmlResult;
});

paidStoryRouter.get('/androidapp', async ctx => {
  const htmlResult = await render('storytable-androidapp.html', {
    nodeEnv:nodeEnv,
    jsFile:'storyTableAndroid',
    header:headerAndroidData
  });
  ctx.body = htmlResult;
});

paidStoryRouter.get('/web', async ctx => {
  const htmlResult = await render('storytable-web.html', {
    nodeEnv:nodeEnv,
    jsFile:'storyTableWeb',
    header:headerWebData
  });
  ctx.body = htmlResult;
});

paidStoryRouter.get('/all', async ctx => {
  const htmlResult = await render('storytable-all.html', {
    nodeEnv:nodeEnv,
    jsFile:'storyTableAll',
    header:headerAllData
  });
  ctx.body = htmlResult;
});

router.use('/paidstory', paidStoryRouter.routes());
router.get('/', ctx => {
  ctx.redirect('/paidstory/iphoneapp');
});

// adMonitorRouter
adMonitorRouter.get('/gap', async ctx => {
  ctx.body = await render('admonitor-gap.html', {
    nodeEnv: nodeEnv,
    neadCharts: true,
    jsFile:'adMonitorGap',
    header: require('./data/adMonitorGap')
  })
});

adMonitorRouter.get('/gapindex', async ctx => {
  ctx.body = await render('admonitor-index.html', {
    nodeEnv: nodeEnv,
    neadCharts: true,
    jsFile:'adMonitorIndex',
    header: require('./data/adMonitorIndex')
  })
});

router.use('/admonitor', adMonitorRouter.routes());
/*
router.get('/chuanyang/cy.json',  ctx => {
  ctx.body = jetpack.read('./chuanyang/cy.json', 'json')
});

router.get('/chuanyang/cynew.csv',  ctx => {
  ctx.body = jetpack.read('./chuanyang/cynew.csv', 'utf8')
});
*/

//userPyramidRouter
userPyramidRouter.get('/main', async ctx => {
  ctx.body = await render('userPyramid.html', {
    nodeEnv: nodeEnv,
    neadCharts: true,
    jsFile:'userPyramid',
    header: require('./data/userPyramid')
  })
});
userPyramidRouter.get('/iphoneapp', async ctx => {
  ctx.body = await render('userpyramid-iphoneapp.html', {
    nodeEnv: nodeEnv,
    neadCharts: true,
    jsFile:'userPyramidiPhone',
    header: require('./data/userPyramidiPhone')
  })
});
userPyramidRouter.get('/androidapp', async ctx => {
  ctx.body = await render('userpyramid-androidapp.html', {
    nodeEnv: nodeEnv,
    neadCharts: true,
    jsFile:'userPyramidAndroid',
    header: require('./data/userPyramidAndroid')
  })
});
userPyramidRouter.get('/web', async ctx => {
  ctx.body = await render('userpyramid-web.html', {
    nodeEnv: nodeEnv,
    neadCharts: true,
    jsFile:'userPyramidWeb',
    header: require('./data/userPyramidWeb')
  })
});
router.use('/userpyramid', userPyramidRouter.routes());

app.use(router.routes());

app.listen(8080)
  .on('listening', () => {
    console.log('Listening 8080');
  });
