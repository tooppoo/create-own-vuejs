import { h, mount } from '../../src/vnode/handler'

const node1 = h('div', { class: 'conatiner' }, [
  h('div', null, 'X'),
  h('span', null, 'hello'),
  h('span', null, 'world'),
])

const app = document.getElementById('app')
if (app) {
  mount(node1, app)
} else {
  throw new Error('app not found')
}
