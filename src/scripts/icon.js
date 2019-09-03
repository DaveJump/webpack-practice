import style from 'styles/icon.scss'

function createIcon () {
  var imgNode = document.createElement('span')
  imgNode.classList.add(style['img-icon-2'])
  document.body.appendChild(imgNode)
}

export default createIcon