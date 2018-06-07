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
    storyTable: './client/js/storyTable.js'
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
      filename:'views/pages/storytable.html',
      template:'views/pages/storytable.html'
    }),
  
    new HtmlWebpackPlugin({
      filename:'views/base.html',
      template: 'views/base.html'
    }),
 
        /*
   new NunjucksWebpackPlugin({
     templates:[
       {
         from: path.join(__dirname, 'views/pages/storytable.nunj'),
         to:'storytable.html'
       }
     ]
     //configure:env
   })
   

      new HtmlWebpackPlugin({
        filename:'storytable.html',
        template:'views/pages/storytable.njk'
      })
       */
  ]
}