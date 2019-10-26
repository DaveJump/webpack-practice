const { configCommon, outputPath, resolve } = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const HardSourcePlugin = require('hard-source-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const argv = require('yargs-parser')(process.argv.slice(2))
const {
  ts: _TS_,
  sw: _SW_,
  ssr: _SSR_,
  analyse: _ANALYSE_,
  threads: _MULTITHREADS_
} = argv
const smp = new SpeedMeasurePlugin()

let plugins = [
  new CleanWebpackPlugin({
    dry: false
  }),
  new HardSourcePlugin()
  // new CompressionPlugin({
  //   filename: '[path].gz[query]',
  //   test: /\.(js|css)(\?.*)?$/i,
  //   deleteOriginalAssets: true
  // })
]

if (_SW_) {
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

const output = {
  filename: `js/[name]${_SSR_ ? '' : '_[chunkhash:8]'}.js`,
  chunkFilename: `js/[name]${_SSR_ ? '' : '_[chunkhash:8]'}.js`,
  publicPath: _SSR_ ? '/' : argv['public-path'] ? argv['public-path'] : './',
  path: outputPath
}

if (_SSR_) {
  output.libraryTarget = 'umd'
  output.libraryExport = 'default'
}

const configProd = {
  mode: 'production',
  performance: {
    hints: 'warning'
  },
  // devtool: 'cheap-module-source-map',
  // stats: 'errors-only',
  output,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // drop_console: true
          }
        },
        extractComments: true,
        // parallel: true // default to os.cpus().length - 1
        cache: true
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/,
        cssProcessor: require('cssnano')
      })
    ]
  },
  plugins
}

if (_TS_) {
  Object.assign(configProd, {
    entry: {
      main: resolve('./src/index.ts')
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

if (_MULTITHREADS_) {
  // It is recommended to use multi-threading mode only on high-performance consumed loaders, otherwise the packaging efficiency improvement will be limited, which is a waste of resources.
  configCommon.module.rules[0] = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'thread-loader',
        options: {
          workers: 2
        }
      },
      'babel-loader',
      'eslint-loader'
    ]
  }
}

const mergedConfig = merge(configCommon, configProd)
const config = _ANALYSE_ === 'speed' ? smp.wrap(mergedConfig) : mergedConfig

module.exports = config
