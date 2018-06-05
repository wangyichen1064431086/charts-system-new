const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
     './client/js/storyTable.js'
  ],
  output: {
    path: path.join(__dirname, '.tmp','scripts'),
    filename:'storyTable.js',
    libraryTarget: 'var',
    library: 'myLibrary',
    publicPath:'/static/'
  }
}