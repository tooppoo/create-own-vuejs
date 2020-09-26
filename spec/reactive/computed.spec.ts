import { ref } from '../../src/reactive/ref'
import { computed } from '../../src/reactive/computed'

describe('computed', () => {
  describe('ref', () => {
    describe('function', () => {
      it('最新の結果が返る', () => {
        const count =  ref<number>(1)
        const plusOne = computed(() => count.value + 1)

        expect(plusOne.value).toBe(2)

        count.value += 1

        expect(plusOne.value).toBe(3)

        count.value = 0

        expect(plusOne.value).toBe(1)
      })
    })
  })
})
