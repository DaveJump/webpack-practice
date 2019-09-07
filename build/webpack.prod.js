const { configCommon, outputPath } = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const merge = require('webpack-merge')

const configProd = {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name]-[contenthash].js',
    chunkFilename: 'js/[name]-[contenthash].js',
    publicPath: './',
    path: outputPath
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        },
        extractComments: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      test: /\.(js|css)(\?.*)?$/i,
      deleteOriginalAssets: true
    })
  ]
}

module.exports = merge(configCommon, configProd)