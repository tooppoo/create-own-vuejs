import { watchEffect } from '../../src/reactive/effect'
import { ref, ReactivePrimitive } from '../../src/reactive/ref'

describe(ref, () => {
  describe('複数箇所変更', () => {
    type SUT = { value: number }
    const createSut = () => ref(0)

    describe('リアクティブ発火回数', () => {
      describe.each([
        [
          '依存なし',
          (_sut: SUT) => () => `none`,
          0,
        ],
        [
          '依存あり',
          (sut: SUT) => () => `${sut.value}`,
          1,
        ],
      ])(
        '%s',
        (_case, createEffect, expected) => {
          it(`${expected}回発火`, () => {
            const sut = createSut()
            const effect = jest.fn(createEffect(sut))

            watchEffect(effect) // 即時発火

            sut.value += 1

            expect(effect).toBeCalledTimes(1 + expected) // 即時発火分, 1追加
          })
        }
      )
    })
  })
  describe('プリミティブ値', () => {
    describe.each([
      [0, 1],
      ['string', 'text'],
      [true, false],
      [[1, 2, 3], [1, 2]],
    ])(
      '値が %s から %s に変わったとき',
      (old, next) => {
        it('リアクティブ発火すること', () => {
          const sut = ref(old)
          const effect = jest.fn(() => sut.value)

          watchEffect(effect) // 即時発火

          sut.value = next

          expect(effect).toBeCalledTimes(1 + 1) // 即時発火分, 1追加
        })
      }
    )
  })
})