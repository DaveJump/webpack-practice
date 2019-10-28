const JSZip = require('jszip')
const zip = new JSZip()
const path = require('path')
const RawSource = require('webpack-sources').RawSource

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      const filename = this.options.filename.replace(
        /\[(hash):?(\d*)?\]/g,
        (str, g1, g2) => (g2 >= 0 ? compilation.hash.slice(0, g2) : compilation.hash)
      )
      const folder = zip.folder()

      for (let file in compilation.assets) {
        const source = compilation.assets[file].source()
        folder.file(file, source)
        zip.generateAsync({ type: 'nodebuffer' }).then(content => {
          const outputPath = path.join(
            compilation.options.output.path,
            `${filename + (/\.zip$/.test(filename) ? '' : '.zip')}`
          )
          const outputRelativePath = path.relative(
            compilation.options.output.path,
            outputPath
          )
          const hash = {}
          for (let key in compilation) {
            if (key.indexOf('hash') >= 0) {
              hash[key] = compilation[key]
            }
          }
          require('fs').writeFileSync(path.join(process.cwd(), 'test.json'), JSON.stringify(hash))
          compilation.assets[outputRelativePath] = new RawSource(content)
          callback()
        })
      }
    })
  }
}
