const path = require('path');
const fs = require('fs-jetpack');
const nunjucks = require('nunjucks');
const headerWebData = require('./data/webData');
const headerIphoneData = require('./data/iPhoneData');
const headerAndroidData = require('./data/androidData');
const headerAllData = require('./data/allData');
var env = new nunjucks.Environment( 
  new nunjucks.FileSystemLoader(
    [
      path.resolve(__dirname, 'dist/views'),
      path.resolve(__dirname, 'dist/views/pages'),
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

function renderNunjucks() {
  Promise.all(
    [
      render('iphoneapp.html', {
        nodeEnv:'prod',
        jsFile:'storyTableiPhone',
        header:headerIphoneData
      }),
      render('androidapp.html', {
        nodeEnv:'prod',
        jsFile:'storyTableAndroid',
        header:headerAndroidData
      }),
      render('web.html', {
        nodeEnv:'prod',
        jsFile:'storyTableWeb',
        header:headerWebData
      }),
      render('all.html', {
        nodeEnv:'prod',
        jsFile:'storyTableAll',
        header:headerAllData
      })
    ]
  ).then(([res1, res2, res3, res4]) => {
    fs.writeAsync(path.resolve(__dirname,'dist/iphoneapp.html'),res1);
    fs.writeAsync(path.resolve(__dirname,'dist/androidapp.html'),res2);
    fs.writeAsync(path.resolve(__dirname,'dist/web.html'),res3);
    fs.writeAsync(path.resolve(__dirname,'dist/all.html'),res4);
  })
};

renderNunjucks();
