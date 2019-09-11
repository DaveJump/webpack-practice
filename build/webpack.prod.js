const { configCommon, outputPath, resolve } = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const argv = require("yargs-parser")(process.argv.slice(2))
const { ts: _ts, sw: _sw } = argv

let plugins = [
  new CleanWebpackPlugin({
    dry: false
  }),
  // new CompressionPlugin({
  //   filename: '[path].gz[query]',
  //   test: /\.(js|css)(\?.*)?$/i,
  //   deleteOriginalAssets: true
  // })
]

if (_sw) {
  plugins.push(
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new webpack.DefinePlugin({
      'process.USE_SW': true
    })
  )
}

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
            // drop_console: true
          }
        },
        extractComments: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins
}

if (_ts) {
  Object.assign(configProd, {
    entry: {
      main: resolve('../src/index.ts')
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader'
          }
        }
      ]
    }
  })
}

module.exports = merge(configCommon, configProd)
