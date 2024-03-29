var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {},
        }, ],
      },
      {
        test: /\.(mp3)$/,
        use: [{
          loader: 'file-loader'
        }, ],
      }
    ]
  },
};