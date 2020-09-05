import { h } from '../../src/vnode/handler'
import { Children, VNode } from '../../src/vnode/type'
import { reactive } from '../../src/reactive/reactive'
import { watchEffect } from '../../src/reactive/effect'

const render = (clickCount: Children) => {
  return h(
    'div',
    { class: 'container' },
    [
      h('h1', null, clickCount),
      h('p', null, 'clicks')
    ]
  )
}

const state = reactive({
  count: 0,
})

let previousNode: VNode | null = null
watchEffect(() => {
  if (!previousNode) {

  } else {

  }
})
