const path = require('path');
const webpack = require('webpack');
const sassLoader = 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true';

module.exports = {
  mode: 'development',
  entry: {
    storyTableAll: ['./client/js/storyTableAll.js'],
    storyTableiPhone: ['./client/js/storyTableiPhone.js'],
    storyTableAndroid: ['./client/js/storyTableAndroid.js'],
    storyTableWeb: ['./client/js/storyTableWeb.js'],
    adMonitorGap: ['./client/js/adMonitorGap.js'],
    adMonitorIndex: ['./client/js/adMonitorIndex.js']
  },

  output: {
    path: path.join(__dirname, '.tmp'), //QUEST：怎样才能看到.tmp文件？
    filename: '[name].js',
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