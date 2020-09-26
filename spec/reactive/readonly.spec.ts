import { watchEffect } from '../../src/reactive/effect'
import { readonly } from '../../src/reactive/readonly'
import { reactive } from '../../src/reactive/reactive'
import { ref } from '../../src/reactive/ref'

describe('readonly', () => {
  type SUT = { count: number }

  describe('reactive object', () => {
    const createSut = (): SUT => reactive({ count: 1 })

    it('変更が検知されること', () => {
      const original = createSut()
      const sut = readonly(original)

      const effect = jest.fn(() => sut.count)

      watchEffect(effect) // 即時発火

      original.count += 1

      expect(effect).toBeCalledTimes(1 + 1)
    })

    it('更新できないこと', () => {
      const original = createSut()
      const sut = readonly(original)

      expect(() => sut.count += 1).toThrowError()
    })
  })
  describe('ref object', () => {
    it('変更が検知されること', () => {
      const original = ref(1)
      const sut = readonly(original)

      const effect = jest.fn(() => sut.value)

      watchEffect(effect) // 即時発火

      original.value += 1

      expect(effect).toBeCalledTimes(1 + 1)
    })
    it('変更できないこと', () => {
      const sut = readonly(ref(1))

      expect(() => sut.value += 1).toThrowError()
    })
  })
})
