const path = require('path');
const webpack = require('webpack');
const sassLoader = 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true';

module.exports = {
  mode: 'development',
  entry: [
     './client/js/storyTable.js'
  ],
  output: {
    path: path.join(__dirname, '.tmp','scripts'),
    filename:'storyTable.js',
    publicPath:'/static/'
  },
  module: {
    rules: [
      {
        test:/\.scss$/,
        include: [
          path.resolve(__dirname, 'client/scss'),
        ],
        loader: sassLoader
      }
    ]
  }
}