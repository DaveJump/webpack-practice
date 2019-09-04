import createHeader from 'scripts/header'
import createContent from 'scripts/content'
import createIcon from 'scripts/icon'
import placeholder from 'scripts/placeholder'
import counter from 'scripts/counter'

import style from 'styles/icon.scss'
import img from 'images/icon.png'
import 'fonts/iconfont.css'

import React from 'react'
import ReactDom from 'react-dom'

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

counter()
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

ReactDom.render(<App />, document.getElementById('react-root'))
