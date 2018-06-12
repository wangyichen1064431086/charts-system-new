const path = require('path');
const webpack = require('webpack');
const sassLoader = 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true';

module.exports = {
  mode: 'development',
  // entry: {
  //   storyTableiPhone: './client/js/storyTableiPhone.js',
  //   storyTableAndroid: './client/js/storyTableAndroid.js'
  // },
  //entry: ['./client/js/storyTableWeb.js'],
  //entry: ['./client/js/storyTableiPhone.js'],
  entry: ['./client/js/storyTableAndroid.js'],
  output: {
    path: path.join(__dirname, '.tmp'),
    //filename:'storyTableiPhone.js',
    filename:'storyTableAndroid.js',
    //filename:'storyTableWeb.js',
    //filename: '[name].js',
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