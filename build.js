const path = require('path');
const fs = require('fs-jetpack');
const nunjucks = require('nunjucks');

var env = new nunjucks.Environment( 
  new nunjucks.FileSystemLoader(
    [
      path.resolve(__dirname, 'dist/views'),
      path.resolve(__dirname, 'dist/views/pages')
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

async function renderNunjucks() {
  const htmlResult = await render('storytable.html', {
    nodeEnv: 'prod'
  });
  fs.writeAsync(path.resolve(__dirname,'dist/storytable.html'),htmlResult)
};

renderNunjucks();
