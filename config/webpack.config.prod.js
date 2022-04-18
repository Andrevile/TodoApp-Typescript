const { merge } = require('webpack-merge');
const path = require('path');
const commonWebpack = require('./webpack.config.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = merge(commonWebpack, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new Dotenv({
      path: '.env',
    }),
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify, //imageminGenerate, Jpeg -> jpg 변환할 때 씀, 압축률은 그리 크지 않은듯
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
            ],
          },
        },
      }),
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 콘솔 로그를 제거한다
          },
        },
      }),
    ],
  },
});
