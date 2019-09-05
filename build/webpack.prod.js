const { configCommon } = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')

const configProd = {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin({
      dry: false
    })
  ]
}

module.exports = merge(configCommon, configProd)