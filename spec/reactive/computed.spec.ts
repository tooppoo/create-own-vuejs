import { ref } from '../../src/reactive/ref'
import { computed } from '../../src/reactive/computed'

describe('computed', () => {
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

  describe('object', () => {
    it('最新の結果が返る', () => {
      const count = ref<number>(1)
      const sut = computed({
        get: () => count.value + 3,
        set: val => count.value = val - 2
      })

      expect(count.value).toBe(1)
      expect(sut.value).toBe(4)

      sut.value = 1

      expect(count.value).toBe(-1)
      expect(sut.value).toBe(2)
    })
  })
})
