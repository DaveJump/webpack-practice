const { configCommon, outputPath } = require('./webpack.common')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const configDev = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: outputPath,
    compress: true,
    open: true,
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true
    },
    stats: 'errors-only',
    quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ]
}

module.exports = merge(configCommon, configDev)
