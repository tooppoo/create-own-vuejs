import { h, mount } from '../../src/vnode/handler'

const node = h('div', { class: 'conatiner' }, [
  h('div', null, 'X'),
  h('span', null, 'hello'),
  h('span', null, 'world'),
])

const app = document.getElementById('app')
if (app) {
  mount(node, app)
} else {
  throw new Error('app not found')
}
