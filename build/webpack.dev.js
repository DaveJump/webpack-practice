const { configCommon, outputPath } = require('./webpack.common')
const webpack = require('webpack')
const merge = require('webpack-merge')

const configDev = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: outputPath,
    open: true,
    hot: true,
    hotOnly: true
  },
  optimization: {
    usedExports: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(configCommon, configDev)