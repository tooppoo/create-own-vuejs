import { h, mount, patch } from '../../src/vnode/handler'

const node1 = h('div', { class: 'container' }, [
  h('div', null, 'X'),
  h('span', null, 'hello'),
  h('span', null, 'world'),
])

const node2 = h('div', { class: 'container' }, [
  h('h1', null, 'Hello Dev 💻'),
  h('p', null, [
    h('span', null, 'Thanks for reading the'),
    h('a', { href: 'https://marc.dev' }, 'marc.dev'),
    h('span', null, ' blog')
  ]),
  h(
    'img',
    {
      src: 'https://media.giphy.com/media/26gsjCZpPolPr3sBy/giphy.gif',
      style: 'width: 350px; border-radius: 0.5rem;',
    },
    []
  )
])

const app = document.getElementById('app')
if (app) {
  mount(node1, app)

  setTimeout(() => { patch(node1, node2) }, 3000)
} else {
  throw new Error('app not found')
}
