const counter = () => {
  let count = 0
  let trigger = document.createElement('button')
  let text = document.createElement('span')
  trigger.innerText = 'Add'
  text.innerText = count
  const clickHandler = () => {
    count = count + 1
    text.innerText = count
  }
  trigger.removeEventListener('click', clickHandler)
  trigger.addEventListener('click', clickHandler, false)
  document.body.appendChild(trigger)
  document.body.appendChild(text)
}

export default counter