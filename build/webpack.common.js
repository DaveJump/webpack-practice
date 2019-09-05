const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = function (pattern) {
  return path.resolve(__dirname, pattern)
}
const outputPath = resolve('../dist')

const configCommon = {
  entry: {
    main: resolve('../src/index.js')
  },
  output: {
    filename: '[name].js',
    path: outputPath,
    publicPath: './'
  },
  module: {
    rules: [
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'postcss-loader',
          'sass-loader'
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
    })
  ],
  optimization: {
    splitChunks: {
      maxInitialRequests: 5,
      cacheGroups: {
        antd: {
          test: module => /antd|ant-design/g.test(module.context),
          chunks: 'initial',
          name: 'antd-common',
          priority: 10
        },
        react: {
          test: module => /react/g.test(module.context),
          chunks: 'initial',
          name: 'react-common',
          priority: 10
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
          priority: 2
        }
      }
    },
    runtimeChunk: 'single'
  }
}

module.exports = {
  outputPath,
  configCommon
}