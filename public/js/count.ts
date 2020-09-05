import { ReactiveDependency, watchEffect } from '../../src/reactive/effect'

const count = new ReactiveDependency(1)

watchEffect(() => {
  console.log('👻 value changed', count.value)
});

[1, 2, 3, 4].forEach((index) => {
  setTimeout(() => count.value += 1, index * 1000)
})
