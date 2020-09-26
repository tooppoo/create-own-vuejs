import { watchEffect } from '../../src/reactive/effect'
import { readonly } from '../../src/reactive/readonly'
import { reactive } from '../../src/reactive/reactive'

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
})
