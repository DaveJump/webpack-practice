import createHeader from 'scripts/header'
import createContent from 'scripts/content'
import createIcon from 'scripts/icon'
import placeholder from 'scripts/placeholder'

import 'styles/icon.scss'
import 'fonts/iconfont.css'
import img from 'images/icon.png'
import bigBg from 'images/big/bg.jpg'

import { strAdd } from 'scripts/math'

import { join } from 'lodash/array'

import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from 'components/home'
import List from 'components/list'

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDom.render(
  <div>
    <App />
    <br />
    <img src={ bigBg } style={{ width: '500px' }} />
  </div>,
  document.getElementById('react-root')
)

const el = document.createElement('div')
el.innerHTML = join([1, 2, 3], '***')
document.body.appendChild(el)

strAdd('9999', '123')

createHeader()
createContent()
createIcon()

const imgNode = document.createElement('img')
imgNode.src = img
imgNode.classList.add('img-icon')
document.body.appendChild(imgNode)

const textNode = document.createElement('i')
textNode.style.fontSize = '50px'
textNode.classList.add('iconfont', 'iconemoji-')
document.body.appendChild(textNode)

const count = () => {
  return import('scripts/counter' /* webpackChunkName: "counter" *//* webpackPrefetch: true */).then(({ default: counter }) => counter)
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
if (process.env.NODE_ENV === 'production' && process.USE_SW) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('serviceWorker registed.')
      })
      .catch(e => {
        console.error('serviceWorker register failed.', e)
      })
  }
}
