const createHeader = () => {
  let dom = document.getElementById('root')
  let header = document.createElement('div')
  header.innerText = 'header'
  dom.appendChild(header)
}

export default createHeader
