const path = require('path');
const webpack = require('webpack');
const sassLoader = 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true';

module.exports = {
  mode: 'development',
  entry: {
    storyTable: ['./client/js/storyTable.js'],
    storyTableiPhone: ['./client/js/storyTableiPhone.js'],
    storyTableAndroid: ['./client/js/storyTableAndroid.js'],
    storyTableWeb: ['./client/js/storyTableWeb.js'],
    adMonitor: ['./client/js/adMonitor.js'],
    adMonitorOne: ['./client/js/adMonitorOne.js'],
    userPyramid: ['./client/js/userPyramid.js'],
    userPyramidiPhone: ['./client/js/userPyramidiPhone.js'],
    userPyramidAndroid: ['./client/js/userPyramidAndroid.js'],
    userPyramidWeb: ['./client/js/userPyramidWeb.js']
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