import { ReactiveDependency, watchEffect } from '../../src/reactive/effect'
import { reactive } from '../../src/reactive/reactive'

const state = reactive({
  count: 1,
  name: 'Marc'
})

watchEffect(
  () => console.log('👻 state changed', state.count, state.name)
);

setTimeout(() => {
  state.count += 1
  state.name = 'Johnny'
}, 3000)
setTimeout(() => {
  state.count += 1
}, 5000)
setTimeout(() => {
  state.count += 1
  state.name = 'Fowler'
}, 10000)
