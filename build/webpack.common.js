const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')
const glob = require('glob')
const argv = require('yargs-parser')(process.argv.slice(2))
const { mode: _MODE_, dll: _DLL_, ssr: _SSR_ } = argv
const projectRoot = process.cwd()
const resolve = (...pattern) => path.resolve(projectRoot, ...pattern)
const outputPath = resolve('./dist')

const cssExtractLoaderOpt = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: _MODE_ === 'development'
  }
}

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  }),
  new PurgecssPlugin({
    paths: glob.sync(`${resolve('./src')}/**/*`, { nodir: true })
  }),
  function() {
    // catching errors
    this.hooks.done.tap('done', stats => {
      const { errors } = stats.compilation
      if (errors && errors.length && process.argv.indexOf('--watch') < 0) {
        // do something
        process.exit(/*1*/)
      }
    })
  }
]

// multi-entries
function getEntry() {
  const entry = {}
  const dir = _SSR_ ? '__server__' : '__client__'
  glob.sync(resolve(`./src/pages/${dir}/*/index.js`)).forEach(name => {
    const reg = new RegExp(`/src/pages/${dir}/([^/]+)?.*$`)
    const entryKey = name.match(reg)[1]
    entry[entryKey] = name
  })
  return entry
}

const entry = getEntry()

Object.keys(entry).forEach(entryName => {
  plugins.push(
    new HtmlWebpackPlugin({
      template: `${entry[entryName].replace(/(\.js)$/, '.html')}`,
      filename: `${entryName}.html`,
      chunks: ['runtime', 'vendors', 'lodash', 'react', entryName]
    })
  )
})

const configCommon = {
  entry,
  performance: false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true', 'eslint-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              outputPath: 'img/',
              limit: 20480
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 40
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      images: resolve('./src/assets/images'),
      fonts: resolve('./src/assets/fonts'),
      styles: resolve('./src/assets/styles'),
      scripts: resolve('./src/scripts'),
      components: resolve('./src/components')
    }
  },
  optimization: {
    usedExports: true
  }
}

// default to dll-reference
if (_DLL_) {
  const dllPath = './build/lib'
  const files = fs.readdirSync(resolve(dllPath))

  files.forEach(file => {
    if (/(.*\.dll)\.js$/.test(file)) {
      plugins.push(
        new AddAssetHtmlPlugin({
          filepath: resolve(dllPath, file),
          outputPath: 'js/',
          publicPath: './js/'
        })
      )
    }
    if (/(.*\.manifest)\.json$/.test(file)) {
      plugins.push(
        new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: resolve(dllPath, file)
        })
      )
    }
  })
} else {
  const splitChunks = {
    maxInitialRequests: 5
  }
  const splitRules = {
    /* antd: {
      test: module => /antd|ant-design/g.test(module.context),
      chunks: 'initial',
      name: 'antd',
      // filename: '[id].js',
      priority: 10
    }, */
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      chunks: 'initial',
      name: 'vendors',
      priority: 2
    },
    react: {
      test: module => /react|react-dom/g.test(module.context),
      chunks: 'initial',
      name: 'react',
      // filename: '[id].js',
      priority: 10
    },
    lodash: {
      test: module => /lodash/g.test(module.context),
      chunks: 'initial',
      name: 'lodash',
      priority: 10
    }
  }
  splitChunks.cacheGroups = splitRules
  configCommon.optimization.splitChunks = splitChunks
}

configCommon.plugins = plugins

if (_SSR_) {
  configCommon.module.rules.push(
    {
      test: /\.css$/,
      use: 'ignore-loader'
    },
    {
      test: /\.scss$/,
      use: 'ignore-loader'
    }
  )
} else {
  configCommon.module.rules.push(
    {
      test: /\.css$/,
      use: [
        cssExtractLoaderOpt,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        cssExtractLoaderOpt,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        'postcss-loader',
        'sass-loader'
      ]
    }
  )
  configCommon.optimization.runtimeChunk = {
    name: 'runtime'
  }
}

module.exports = {
  outputPath,
  resolve,
  configCommon
}
