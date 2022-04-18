const path = require('path');
const { merge } = require('webpack-merge');
const commonWebpack = require('./webpack.config.common');
const Dotenv = require('dotenv-webpack');

module.exports = merge(commonWebpack, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
    static: path.resolve(__dirname, '../src/static/assets'),
    client: {
      logging: 'verbose',
      overlay: true,
    },
    host: 'localhost',
    port: 3000,
    open: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080', // 프록시
    },
  },
  plugins: [
    new Dotenv({
      path: '.env.dev',
    }),
  ],
});
