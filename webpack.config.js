const path = require('path');
const pkg = require('./package.json');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const configServer = require('./config');

module.exports = (_env, argv) => {
  let isDebug = argv.mode !== 'production';

  const config = {
    mode: isDebug ? 'development' : 'production',
    context: path.resolve(__dirname, './client'),
    name: 'client',
    target: 'web',
    entry: {
      client: [
        './js/index.js',
        './sass/index.scss',
         '@babel/polyfill'
      ]
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: isDebug ? 'js/[name].js' : 'js/[name].[fullhash:8].js'
    },
    devServer: {
      port: 3001,
      hot: true,
      devMiddleware: {
        writeToDisk: true,
      },
      static : {directory: path.join(__dirname, './dist')},
      proxy: {
        '/api': {
           target: {
              host: "0.0.0.0",
              protocol: 'http:',
              port: configServer.port
           },
           pathRewrite: {
              '^/api': '/api'
           }
        }
     }
    },
    module: {
      rules: [
        { test: /\.hbs$/, loader: "handlebars-loader" },
        {
          test: /\.(css|scss|sass)$/,
          include: [
            path.resolve(__dirname, './client/')
          ],
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            'sass-loader'
          ]
        },
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, './client')
          ],
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: pkg.browserslist
                }
              ]
            ]
          }
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          handlebarsLoader: {}
        }
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './assets',
            to: './assets'
          }
        ]
      }),
      new HtmlWebpackPlugin({
        title: 'Data warehouse',
        inject: true,
        minify: false,
        scriptLoading: 'blocking',
        template: path.resolve(__dirname, './client/hbs/index.hbs')
      }),
      new HtmlWebpackPlugin({
        title: 'Data warehouse',
        inject: true,
        minify: false,
        scriptLoading: 'blocking',
        filename: 'city.html',
        template: path.resolve(__dirname, './client/hbs/city.hbs')
      }),
      new HtmlWebpackPlugin({
        title: 'Data warehouse',
        inject: true,
        minify: false,
        scriptLoading: 'blocking',
        filename: 'companies.html',
        template: path.resolve(__dirname, './client/hbs/companies.hbs')
      }),
      new HtmlWebpackPlugin({
        title: 'Data warehouse',
        inject: true,
        minify: false,
        scriptLoading: 'blocking',
        filename: 'users.html',
        template: path.resolve(__dirname, './client/hbs/users.hbs')
      }),
      new HtmlWebpackPlugin({
        title: 'Data warehouse',
        inject: true,
        minify: false,
        scriptLoading: 'blocking',
        filename: 'login.html',
        template: path.resolve(__dirname, './client/hbs/login.hbs')
      }),
      new MiniCssExtractPlugin({
        filename: isDebug ? 'css/[name].css' : 'css/[name].[fullhash:5].css',
        chunkFilename: isDebug ? 'css/[name].chunk.css' : 'css/[name].[fullhash:5].chunk.css'
      })
    ],
    devtool: isDebug ? 'inline-cheap-module-source-map' : undefined
  };

  return config;
}
