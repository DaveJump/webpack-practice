const path = require('path')

process.chdir(path.resolve(__dirname, './smoke/template'))

require('./unit/config-test')
