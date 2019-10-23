import { join } from 'lodash/array'
import 'styles/list.scss'

const el = document.getElementById('root-list')
el.innerHTML = join([3, 4, 5], '***')
el.classList.add('black')
document.body.appendChild(el)
