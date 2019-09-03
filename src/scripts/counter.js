export default function counter () {
  var count = 0
  var trigger = document.createElement('button')
  var text = document.createElement('span')
  trigger.innerText = 'Add'
  text.innerText = count
  function clickHandler () {
    count = count + 1
    text.innerText = count
  }
  trigger.removeEventListener('click', clickHandler)
  trigger.addEventListener('click', clickHandler, false)
  document.body.appendChild(trigger)
  document.body.appendChild(text)
}