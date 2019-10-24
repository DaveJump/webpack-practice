/* eslint-disable */

const glob = require('glob-all')

describe('Checking generated static files', () => {
  it('should generate html files', done => {
    const files = ['main', 'list']
    const htmlFiles = glob.sync(
      files.map(f => `./dist/${f}.html`)
    )

    if (htmlFiles.length > 0) {
      done()
    } else {
      throw new Error('html files have not been generated completely!')
    }
  })

  it('should generate css-js files', done => {
    const cssfiles = ['main', 'list']
    const jsfiles = ['main', 'list', 'react', 'runtime', 'lodash', 'vendors']
    const cssJsfiles = glob.sync([
      ...cssfiles.map(f => `./dist/css/${f}.css`),
      ...jsfiles.map(f => `./dist/js/${f}_*.js`),
    ])

    if (cssJsfiles.length > 0) {
      done()
    } else {
      throw new Error('css-js files have not been generated completely!')
    }
  })
})
