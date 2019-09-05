import createHeader from 'scripts/header'
import createContent from 'scripts/content'
import createIcon from 'scripts/icon'
import placeholder from 'scripts/placeholder'
// import counter from 'scripts/counter'

import style from 'styles/icon.scss'
import img from 'images/icon.png'
import 'fonts/iconfont.css'

import React from 'react'
import ReactDom from 'react-dom'

import { add } from 'scripts/math'

import _ from 'lodash'

let el = document.createElement('div')
el.innerHTML = _.join([1, 2, 3], '***')
document.body.appendChild(el)

import { DatePicker } from 'antd'
import 'antd/dist/antd.css'

add(1, 2)

createHeader()
createContent()
createIcon()

let imgNode = document.createElement('img')
imgNode.src = img
imgNode.classList.add(style['img-icon'])
document.body.appendChild(imgNode)

let textNode = document.createElement('i')
textNode.style.fontSize = '50px'
textNode.classList.add('iconfont', 'iconemoji-')
document.body.appendChild(textNode)

const count = () => {
  return import('scripts/counter' /* webpackChunkName: "counter" */).then(({ default: counter }) => counter)
}

count().then(counter => {
  counter()
})

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
    return <div style={{color: 'red'}}>Hello React!</div>
  }
}

ReactDom.render(
  <div>
    <App />
    <DatePicker />
  </div>,
  document.getElementById('react-root')
)