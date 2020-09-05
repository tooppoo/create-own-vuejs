import { watchEffect } from '../../src/reactive/effect'
import { reactive } from '../../src/reactive/reactive'

const state = reactive({
  count: 1,
  name: 'Marc'
})

let key = 100
watchEffect(
  () => console.log('👻 state changed', state.count, state.name)
);
watchEffect(
  // リアクティブオブジェクトに依存していないので
  // 一回実行されて終わり
  () => console.log('no reactive')
)
watchEffect(
  // リアクティブオブジェクトのgetterに到達していないので、
  // stateオブジェクトが更新されてもリアクティブが発火しない
  () => key >= 100 ?
    console.log('test') :
    console.log('name is ' + state.name)
)
watchEffect(
  // 初回実行時にリアクティブオブジェクトのgetterに到達しているので
  // リアクティブが発火する
  () => key >= 99 ?
    key-- && console.log(state.name) :
    console.log('test2')
)

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
}, 7000)
