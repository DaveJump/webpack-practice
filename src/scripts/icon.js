import style from 'styles/icon.scss'

const createIcon = () => {
  let imgNode = document.createElement('span')
  imgNode.classList.add(style['img-icon-2'])
  document.body.appendChild(imgNode)
}

export default createIcon