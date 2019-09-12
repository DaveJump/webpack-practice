const path = require('path')
const webpack = require('webpack')

const libraryName = '_dll_[name]'

module.exports = {
  mode: 'production',
  entry: {
    lodash: ['lodash'],
    react: ['react', 'react-dom']
  },
  output: {
    filename: '[name]_[hash].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: libraryName
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: libraryName,
      path: path.resolve(__dirname, '../dll/[name]_[hash].manifest.json')
    })
  ]
}
