const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sassLoader = 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true';

module.exports = {
  mode: 'production',
  entry: [
     './client/js/storyTable.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename:'storyTable.js',
    publicPath:'dist/'
  },
  module: {
    rules: [
      {
        test:/\.scss$/,
        include: [
          path.resolve(__dirname, 'client/scss'),
        ],
        loader: sassLoader
      },{
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',//https://webpack.js.org/loaders/html-loader/
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:'storytable.html',
      template: path.resolve(__dirname, 'views/pages/storytable.html')
    })
  ]
}