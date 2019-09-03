// custom dev server for webpack compiling (without hot reload)

const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
const compiler = webpack(config)

const app = express()
const port = 3000

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.listen(port, () => {
  console.log(`server listening at port ${port}`)
})