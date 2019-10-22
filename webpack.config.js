const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index',
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    port: 9999,
    clientLogLevel: 'silent',
  },
  output: {
    filename: 'rangeSlider.js',
    path: path.resolve(__dirname, 'docs'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  externals: {
    jquery: '$',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'rangeSlider.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
};
