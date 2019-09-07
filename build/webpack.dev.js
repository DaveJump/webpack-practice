const { configCommon, outputPath } = require('./webpack.common')
const webpack = require('webpack')
const merge = require('webpack-merge')

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
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(configCommon, configDev)