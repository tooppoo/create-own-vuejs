import { h, mount, patch } from '../../src/vnode/handler'
import { Children, VNode } from '../../src/vnode/type'
import { reactive } from '../../src/reactive/reactive'
import { watchEffect } from '../../src/reactive/effect'

const render = (clickCount: Children) =>h(
    'div',
    { class: 'container' },
    [
      h('h1', null, clickCount),
      h('p', null, 'clicks')
    ]
  )

const state = reactive({
  count: 0,
})

let previousNode: VNode | null = null
const app = document.getElementById('app')
if (!app) throw new Error('app not found')

watchEffect(() => {
  if (!previousNode) {
    previousNode = render(`${state.count}`)

    mount(previousNode, app)
  } else {
    const newNode = render(`${state.count}`)

    patch(previousNode, newNode)

    previousNode = newNode
  }
})
