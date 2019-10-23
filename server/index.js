if (typeof window === 'undefined') {
  global.window = {}
}

const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/js/main-server')
const readFileSync = require('fs').readFileSync
const resolve = require('path').resolve
const template = readFileSync(resolve(__dirname, '../dist/main-server.html'), 'utf8')
const mockData = require('./data.json')

createServer(process.env.PORT || 3000)

function createServer(port) {
  const app = express()

  app.use(express.static('dist'))

  app.get('/server/main', (req, res) => {
    const html = renderMarkup(renderToString(SSR))
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
  })
}

function renderMarkup(str) {
  const dataStr = JSON.stringify(mockData)
  return (
    template
      .replace('<!--HTML_PLACEHOLDER-->', str)
      .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`)
  )
}
