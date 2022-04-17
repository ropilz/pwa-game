'use strict';

const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: __dirname + "/",
  entry: {
    app: [
      "./src/main.ts",
      "./src/main.scss"
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      { // typescript
        test: /\.ts$/,
        use: [{
          loader: "ts-loader"
        }]
      },
      { // scss
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader']
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin ({
      inject: true,
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({patterns:
      [
        {from: './src/assets', to: './src/assets'}
      ]
    })
  ]
};
