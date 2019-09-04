const placeholder = () => {
  let prevHolder = document.getElementById('holder')
  prevHolder && prevHolder.remove()
  let holder = document.createElement('div')
  holder.setAttribute('id', 'holder')
  holder.innerText = 4800
  document.body.appendChild(holder)
}

export default placeholder 
