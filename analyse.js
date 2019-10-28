#! /usr/bin/env node

const { existsSync } = require('fs')
const { execSync } = require('child_process')
const path = require('path')
const statPath = path.join(__dirname, 'stats.json')

if (existsSync(statPath)) {
  execAnalyse()
} else {
  generateStats()
  execAnalyse()
}

function generateStats() {
  execSync(`node ${path.resolve(__dirname, './node_modules/.bin/webpack')} --config ${path.resolve(__dirname, './build/webpack.prod.js')} --public-path / --profile --json > ${statPath}`, { stdio: 'inherit' })
}

function execAnalyse() {
  execSync(`node ${path.resolve(__dirname, './node_modules/.bin/webpack-bundle-analyzer')} ${statPath}`, { stdio: 'inherit' })
}
