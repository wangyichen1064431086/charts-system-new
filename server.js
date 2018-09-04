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
paidStoryRouter.get('/main', async ctx => {
  const htmlResult = await render('storytable.html', {
    nodeEnv:nodeEnv,
    jsFile:'storyTable',
    header:require('./data/storyTable')
  });
  ctx.body = htmlResult;
});
paidStoryRouter.get('/iphoneapp', async ctx => {
  const htmlResult = await render('storytable-iphoneapp.html', {
    nodeEnv:nodeEnv,
    jsFile:'storyTableiPhone',
    header:require('./data/storyTableiPhone')
  });
  ctx.body = htmlResult;
});

paidStoryRouter.get('/androidapp', async ctx => {
  const htmlResult = await render('storytable-androidapp.html', {
    nodeEnv:nodeEnv,
    jsFile:'storyTableAndroid',
    header:require('./data/storyTableAndroid')
  });
  ctx.body = htmlResult;
});

paidStoryRouter.get('/web', async ctx => {
  const htmlResult = await render('storytable-web.html', {
    nodeEnv:nodeEnv,
    jsFile:'storyTableWeb',
    header:require('./data/storyTableWeb')
  });
  ctx.body = htmlResult;
});

router.use('/paidstory', paidStoryRouter.routes());


// adMonitorRouter
adMonitorRouter.get('/main', async ctx => {
  ctx.body = await render('admonitor.html', {
    nodeEnv: nodeEnv,
    neadCharts: true,
    jsFile:'adMonitor',
    header: require('./data/adMonitor')
  })
});
adMonitorRouter.get('/one', async ctx => {
  let headerDataName;
  if (ctx.query.adid==='606955') {
    headerDataName = 'adMonitorOne0';
  } else if (ctx.query.adid === '606835') {
    headerDataName = 'adMonitorOne1';
  } else if (ctx.query.adid === '606986') {
    headerDataName = 'adMonitorOne2';
  } else {
    headerDataName = 'adMonitorOne';
  }
  ctx.body = await render('admonitor-one.html', {
    nodeEnv: nodeEnv,
    neadCharts: true,
    jsFile:'adMonitorOne',
    header: require(`./data/${headerDataName}`)
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


router.get('/', ctx => {
  ctx.redirect('/userpyramid/main');
});

app.use(router.routes());

app.listen(8080)
  .on('listening', () => {
    console.log('Listening 8080');
  });
