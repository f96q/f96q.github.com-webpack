const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyEsPlugin = require('uglify-es-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let plugins = [
  new HtmlWebpackPlugin({template: './pugs/index.pug'}),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new ExtractTextPlugin('bundle.css')
]

if (process.env.NODE_ENV == 'production') {
  plugins.push(new UglifyEsPlugin())
}

module.exports = {
  entry: './javascripts/index.js',
  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        })
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: plugins
};
