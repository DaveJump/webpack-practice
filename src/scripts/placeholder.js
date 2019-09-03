export default function placeholder () {
  var prevHolder = document.getElementById('holder')
  prevHolder && prevHolder.remove()
  var holder = document.createElement('div')
  holder.setAttribute('id', 'holder')
  holder.innerText = 4800
  document.body.appendChild(holder)
}
