import { join } from 'lodash/array'
import 'styles/list.scss'

const el = document.getElementById('root-detail')
el.innerHTML = join([33, 44, 55, 66, 77], '---')
el.classList.add('blue')
document.body.appendChild(el)
