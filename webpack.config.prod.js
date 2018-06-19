const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const sassLoader = 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true';
const minify = require('html-minifier');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//const dataForStoryTableiPhone = require('./data/storyTableiPhone.js');
const headerAllData = require('./data/storyTableAll');
const headerIphoneData = require('./data/storyTableiPhone');
const headerAndroidData = require('./data/storyTableAndroid');
const headerWebData = require('./data/storyTableWeb');

const nodeEnv = process.env.NODE_ENV || '';
console.log(nodeEnv);

module.exports = {
  mode: 'production',
  entry: {
    storyTableiPhone: './client/js/storyTableiPhone.js',
    storyTableAndroid: './client/js/storyTableAndroid.js',
    storyTableWeb: './client/js/storyTableWeb.js',
    storyTableAll: './client/js/storyTableAll.js',
    adMonitorGap: './client/js/adMonitorGap.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename:'static/[name].js',//'static/[name].[hash].js'唯一的hash生成，这样可以避免缓存
    publicPath:'.'
  },
  module: {
    rules: [
      {
        test:/\.scss$/,
        include: [
          path.resolve(__dirname, 'client/scss'),
          path.resolve(__dirname,'node_modules')
        ],
        use: [ 
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        resource:{//https://webpack.docschina.org/configuration/module/#%E6%9D%A1%E4%BB%B6
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/storytable-iphoneapp.html'),
            path.resolve(__dirname, 'views/partials'),
            path.resolve(__dirname, 'views/*.html')
          ]
        },
        use: [
          {
            loader: 'html-loader',//https://webpack.js.org/loaders/html-loader/
            options: {
              minimize: true
            }
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: [
                path.resolve(__dirname, 'views'),
                path.resolve(__dirname, 'views/pages'),
                path.resolve(__dirname, 'views/partials')
              ],
              filters: {},
              context: {
                nodeEnv:nodeEnv,
                header: headerIphoneData
              }
            }
          }
        ]
      },
      {
        resource:{//https://webpack.docschina.org/configuration/module/#%E6%9D%A1%E4%BB%B6
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/storytable-androidapp.html'),
            path.resolve(__dirname, 'views/partials'),
            path.resolve(__dirname, 'views/*.html')
          ]
        },
        use: [
          {
            loader: 'html-loader',//https://webpack.js.org/loaders/html-loader/
            options: {
              minimize: true
            }
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: [
                path.resolve(__dirname, 'views'),
                path.resolve(__dirname, 'views/pages'),
                path.resolve(__dirname, 'views/partials')
              ],
              filters: {},
              context: {
                nodeEnv:nodeEnv,
                header: headerAndroidData
              }
            }
          }
        ]
      },
      {
        resource:{//https://webpack.docschina.org/configuration/module/#%E6%9D%A1%E4%BB%B6
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/storytable-web.html'),
            path.resolve(__dirname, 'views/partials'),
            path.resolve(__dirname, 'views/*.html')
          ]
        },
        use: [
          {
            loader: 'html-loader',//https://webpack.js.org/loaders/html-loader/
            options: {
              minimize: true
            }
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: [
                path.resolve(__dirname, 'views'),
                path.resolve(__dirname, 'views/pages'),
                path.resolve(__dirname, 'views/partials')
              ],
              filters: {},
              context: {
                nodeEnv:nodeEnv,
                header: headerWebData
              }
            }
          }
        ]
      },
      {
        resource:{//https://webpack.docschina.org/configuration/module/#%E6%9D%A1%E4%BB%B6
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/storytable-all.html'),
            path.resolve(__dirname, 'views/partials'),
            path.resolve(__dirname, 'views/*.html')
          ]
        },
        use: [
          {
            loader: 'html-loader',//https://webpack.js.org/loaders/html-loader/
            options: {
              minimize: true
            }
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: [
                path.resolve(__dirname, 'views'),
                path.resolve(__dirname, 'views/pages'),
                path.resolve(__dirname, 'views/partials')
              ],
              filters: {},
              context: {
                nodeEnv:nodeEnv,
                header: headerAllData
              }
            }
          }
        ]
      },
      {
        resource:{
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/admonitor-gap.html'),
            path.resolve(__dirname, 'views/partials'),
            path.resolve(__dirname, 'views/*.html')
          ]
        },
        use: [
          {
            loader: 'html-loader',//https://webpack.js.org/loaders/html-loader/
            options: {
              minimize: true
            }
          },
          {
            loader: 'nunjucks-html-loader',
            options: {
              searchPaths: [
                path.resolve(__dirname, 'views'),
                path.resolve(__dirname, 'views/pages'),
                path.resolve(__dirname, 'views/partials')
              ],
              filters: {},
              context: {
                nodeEnv:nodeEnv,
                neadCharts: true,
                header: require('./data/adMonitorGap')
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:'static/[name].css',
      //chunkFilename:'static/[name].css'
    }),
    new HtmlWebpackPlugin({
      filename:'iphoneapp.html',
      template:'views/pages/storytable-iphoneapp.html',
      chunks:['storyTableiPhone'],
      // minify: { //这个是等同于html-minifier的配置，在html-loader中已经设置了，这里就可以不设置了
      //   removeComments:true,
      //   minifyCSS:true,
      //   minifyJS:true
      // }
    }),
    
    new HtmlWebpackPlugin({
      filename:'androidapp.html',
      template:'views/pages/storytable-androidapp.html',
      chunks:['storyTableAndroid']
    }),

    new HtmlWebpackPlugin({
      filename:'web.html',
      template:'views/pages/storytable-web.html',
      chunks:['storyTableWeb']
    }),

    new HtmlWebpackPlugin({
      filename:'all.html',
      template:'views/pages/storytable-all.html',
      chunks:['storyTableAll']
    }),

    new HtmlWebpackPlugin({
      filename:'gap.html',
      template:'views/pages/admonitor-gap.html',
      chunks:['adMonitorGap']
    })

  ],

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { 
          discardComments: { 
            removeAll: true 
          } 
        },

      })
    ]
  }
}