import createHeader from './modules/header'
import createContent from './modules/content'
import createIcon from './modules/icon'
import style from './modules/icon.scss'
import img from './modules/icon.png'
import './fonts/iconfont.css'

createHeader()
createContent()
createIcon()

var imgNode = document.createElement('img')
imgNode.src = img
imgNode.classList.add(style['img-icon'])
document.body.appendChild(imgNode)

var textNode = document.createElement('i')
textNode.style.fontSize = '50px'
textNode.classList.add('iconfont', 'iconemoji-')
document.body.appendChild(textNode)