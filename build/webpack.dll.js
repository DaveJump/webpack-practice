const path = require('path')
const { DllPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const libraryName = '_dll_[name]'

module.exports = {
  mode: 'production',
  entry: {
    lodash: ['lodash'],
    react: ['react', 'react-dom']
  },
  output: {
    filename: '[name]_[chunkhash:8].dll.js',
    path: path.resolve(__dirname, './lib'),
    library: libraryName
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false
    }),
    new DllPlugin({
      context: __dirname,
      name: libraryName,
      path: path.resolve(__dirname, './lib/[name]_[chunkhash:8].manifest.json')
    })
  ]
}
