import a from './modules/a'
import b from './modules/b'
import img from './modules/icon.png'

a()
b()

var imgNode = document.createElement('img')
imgNode.src = img
document.body.appendChild(imgNode)