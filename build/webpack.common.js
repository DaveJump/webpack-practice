const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolve = function (pattern) {
  return path.resolve(__dirname, pattern)
}
const outputPath = resolve('../dist')

const cssExtractLoaderOpt = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: process.env.NODE_ENV === 'development'
  }
}

const configCommon = {
  entry: {
    main: resolve('../src/index.js'),
  },
  performance: false,
  module: {
    rules: [
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
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'img/',
            limit: 20480
          }
        }
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
    alias: {
      images: resolve('../src/assets/images'),
      fonts: resolve('../src/assets/fonts'),
      styles: resolve('../src/assets/styles'),
      scripts: resolve('../src/scripts')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      maxInitialRequests: 5,
      cacheGroups: {
        antd: {
          test: module => /antd|ant-design/g.test(module.context),
          chunks: 'initial',
          name: 'antd',
          // filename: '[id].js',
          priority: 10
        },
        react: {
          test: module => /react/g.test(module.context),
          chunks: 'initial',
          name: 'react',
          // filename: '[id].js',
          priority: 10
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
          priority: 2,
          enforce: true
        }
      }
    }
  }
}

module.exports = {
  outputPath,
  resolve,
  configCommon
}