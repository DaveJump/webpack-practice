function b () {
  var dom = document.getElementById('root')
  var content = document.createElement('div')
  content.innerText = 'content'
  dom.appendChild(content)
}

export default b