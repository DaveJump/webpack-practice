import createHeader from 'scripts/header'
import createContent from 'scripts/content'
import createIcon from 'scripts/icon'
import placeholder from 'scripts/placeholder'

import 'styles/icon.scss'
import commonStyle from 'styles/common.scss'
import 'fonts/iconfont.css'
import img from 'images/icon.png'

import React from 'react'
import ReactDom from 'react-dom'

import { add } from 'scripts/math'

import { join } from 'lodash/array'

let el = document.createElement('div')
el.innerHTML = join([1, 2, 3], '***')
document.body.appendChild(el)

import { DatePicker } from 'antd'
// import 'antd/es/date-picker/style/css'

add(1, 2)

createHeader()
createContent()
createIcon()

let imgNode = document.createElement('img')
imgNode.src = img
imgNode.classList.add('img-icon')
document.body.appendChild(imgNode)

let textNode = document.createElement('i')
textNode.style.fontSize = '50px'
textNode.classList.add('iconfont', 'iconemoji-')
document.body.appendChild(textNode)

const count = () => {
  return import('scripts/counter' /* webpackChunkName: "counter" *//* webpackPrefetch: true */ ).then(({ default: counter }) => counter)
}

count().then(counter => {
  counter()
})

console.log(this, 'this___')

placeholder()

// update handler of HMR (js)
if (module.hot) {
  module.hot.accept('scripts/placeholder', function () {
    console.log('Accepting the updated placeholder module!!!')
    placeholder()
  })
}
class App extends React.Component {
  render () {
    return <div style={{color: commonStyle.successColor}}>Hello React!</div>
  }
}

ReactDom.render(
  <div>
    <App />
    <DatePicker />
  </div>,
  document.getElementById('react-root')
)

if (USE_SW) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('serviceWorker registed.')
      })
      .catch(e => {
        console.error('serviceWorker register failed.')
      })
  }
}