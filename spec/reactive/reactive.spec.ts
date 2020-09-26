import { reactive } from '../../src/reactive/reactive'
import { watchEffect } from '../../src/reactive/effect'

describe(reactive, () => {
  type SUT = { count: number, name: string }
  const createSut = () => reactive<SUT>({ count: 1, name: 'Martin' })

  describe('参照する前に更新', () => {
    it('正常に更新できること', () => {
      const sut = createSut()

      expect(() => sut.count += 1).not.toThrowError()
    })
  })

  describe('複数箇所変更', () => {
    describe('リアクティブ発火回数', () => {
      describe.each([
        [
          '依存なし',
          (sut: SUT) => () => `none`,
          0,
        ],
        [
          '1箇所に依存',
          (sut: SUT) => () => `${sut.count}`,
          1,
        ],
        [
          '2箇所に依存',
          (sut: SUT) => () => `${sut.count} ${sut.name}`,
          2,
        ],
      ])(
        '%s',
        (_case, createEffect, expected) => {
          it(`${expected}回発火`, () => {
            const sut = createSut()
            const effect = jest.fn(createEffect(sut))

            watchEffect(effect) // 即時発火

            sut.count += 1
            sut.name = 'Fowler'

            expect(effect).toBeCalledTimes(1 + expected) // 即時発火分, 1追加
          })
        }
      )
    })
  })
})
