const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const sassLoader = 'style-loader!css-loader!sass-loader?sourceMap=true&sourceMapContents=true';
const minify = require('html-minifier');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// const headerAllData = require('./data/storyTableAll');
// const headerIphoneData = require('./data/storyTableiPhone');
// const headerAndroidData = require('./data/storyTableAndroid');
// const headerWebData = require('./data/storyTableWeb');

const nodeEnv = process.env.NODE_ENV || '';
console.log(nodeEnv);

module.exports = {
  mode: 'production',
  entry: {
    // storyTableiPhone: './client/js/storyTableiPhone.js',
    // storyTableAndroid: './client/js/storyTableAndroid.js',
    // storyTableWeb: './client/js/storyTableWeb.js',
    // storyTableAll: './client/js/storyTableAll.js',
    // adMonitorGap: './client/js/adMonitorGap.js',
    // adMonitorIndex: './client/js/adMonitorIndex.js'
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
    path: path.join(__dirname, 'dist'),
    filename:'../static/[name].js',//'static/[name].[hash].js'唯一的hash生成，这样可以避免缓存
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
                header: require('./data/storyTableiPhone')
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
                header: require('./data/storyTableAndroid')
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
                header: require('./data/storyTableWeb')
              }
            }
          }
        ]
      },
      {
        resource:{//https://webpack.docschina.org/configuration/module/#%E6%9D%A1%E4%BB%B6
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/storytable.html'),
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
                header: require('./data/storyTable')
              }
            }
          }
        ]
      },
      {
        resource:{
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/admonitor-one.html'),
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
                header: require('./data/adMonitorOne')
              }
            }
          }
        ]
      },   
      {
        resource:{
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/admonitor.html'),
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
                header: require('./data/adMonitor')
              }
            }
          }
        ]
      },

      {
        resource:{
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/userpyramid.html'),
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
                header: require('./data/userPyramid')
              }
            }
          }
        ]
      },
      {
        resource:{
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/userpyramid-iphoneapp.html'),
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
                header: require('./data/userPyramidiPhone')
              }
            }
          }
        ]
      },
      {
        resource:{
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/userpyramid-androidapp.html'),
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
                header: require('./data/userPyramidAndroid')
              }
            }
          }
        ]
      },
      {
        resource:{
          test:/\.html$/,
          or:[
            path.resolve(__dirname, 'views/pages/userpyramid-web.html'),
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
                header: require('./data/userPyramidWeb')
              }
            }
          }
        ]
      }
      
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:'../static/[name].css',
      //chunkFilename:'static/[name].css'
    }),
    new HtmlWebpackPlugin({
      filename:'paidstory/iphoneapp.html',
      template:'views/pages/storytable-iphoneapp.html',
      chunks:['storyTableiPhone'],
      // minify: { //这个是等同于html-minifier的配置，在html-loader中已经设置了，这里就可以不设置了
      //   removeComments:true,
      //   minifyCSS:true,
      //   minifyJS:true
      // }
    }),
    
    new HtmlWebpackPlugin({
      filename:'paidstory/androidapp.html',
      template:'views/pages/storytable-androidapp.html',
      chunks:['storyTableAndroid']
    }),

    new HtmlWebpackPlugin({
      filename:'paidstory/web.html',
      template:'views/pages/storytable-web.html',
      chunks:['storyTableWeb']
    }),

    new HtmlWebpackPlugin({
      filename:'paidstory/main.html',
      template:'views/pages/storytable.html',
      chunks:['storyTable']
    }),

    new HtmlWebpackPlugin({
      filename:'admonitor/main.html',
      template:'views/pages/admonitor.html',
      chunks:['adMonitor']
    }),
    
    new HtmlWebpackPlugin({
      filename:'admonitor/one.html',
      template:'views/pages/admonitor-one.html',
      chunks:['adMonitorOne']
    }),

    new HtmlWebpackPlugin({
      filename:'userpyramid/main.html',
      template:'views/pages/userpyramid.html',
      chunks:['userPyramid']
    }),

    new HtmlWebpackPlugin({
      filename:'userpyramid/iphoneapp.html',
      template:'views/pages/userpyramid-iphoneapp.html',
      chunks:['userPyramidiPhone']
    }),

    new HtmlWebpackPlugin({
      filename:'userpyramid/androidapp.html',
      template:'views/pages/userpyramid-androidapp.html',
      chunks:['userPyramidAndroid']
    }),

    new HtmlWebpackPlugin({
      filename:'userpyramid/web.html',
      template:'views/pages/userpyramid-web.html',
      chunks:['userPyramidWeb']
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