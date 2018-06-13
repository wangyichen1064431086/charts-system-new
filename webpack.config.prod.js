const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sassLoader = 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true';
/*
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');

const nunjucks = require('nunjucks');
const env = new nunjucks.Environment( //也就是起到了'koa-views'的作用
  new nunjucks.FileSystemLoader(
    [
      path.resolve(__dirname, 'views'),
      path.resolve(__dirname, 'views/pages')
    ],
    {
      watch:false,
      noCache: true
    }
  ),
  {autoescape: false}
);
*/
module.exports = {
  mode: 'production',
  entry: {
    storyTableiPhone: './client/js/storyTableiPhone.js',
    storyTableAndroid: './client/js/storyTableAndroid.js',
    storyTableWeb: './client/js/storyTableWeb.js',
    storyTableAll: './client/js/storyTableAll.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename:'static/[name].js',
    publicPath:'.'
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
      }/*,{
        test: /\.html$/,
        loader:'nunjucks-loader'
      },{
        test: /\.nunj$/,
        loader: 'file?context=&name=[path][name].html!nunjucks-html?'+
          JSON.stringify({
            'searchPaths':[
              '/views/pages',
              '/views'
            ]
          })
      },{
        test: /\.njk$/,
        use: [
          {
            loader:'nunjucks-isomorphic-loader',
            query: {
              root:[path.resolve(__dirname,'views/pages')]
            }
          }
        ]
      },{
        test: /\.(html|njk)$/,
        use:[
          'html-loader',
          {
            loader:'nunjucks-to-html-loader',
            options: {
              alias: {
                templates: path.resolve(__dirname,'views')
              }
            }
          }
        ]
      }*/
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:'views/pages/iphoneapp.html',
      template:'views/pages/storytable-iphoneapp.html',
      chunks:[]
    }),
  
    new HtmlWebpackPlugin({
      filename:'views/pages/androidapp.html',
      template:'views/pages/storytable-androidapp.html',
      chunks:[]
    }),

    new HtmlWebpackPlugin({
      filename:'views/pages/web.html',
      template:'views/pages/storytable-web.html',
      chunks:[]
    }),

    new HtmlWebpackPlugin({
      filename:'views/pages/all.html',
      template:'views/pages/storytable-all.html',
      chunks:[]
    }),

    new HtmlWebpackPlugin({
      filename:'views/partials/header.html',
      template: 'views/partials/header.html',
      chunks:[]
    }),

    new HtmlWebpackPlugin({
      filename:'views/base.html',
      template: 'views/base.html',
      chunks:[]
    })
  ]
}