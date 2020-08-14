import { mount, NodeContainer } from '../../src/vnode/handler'
import { Children, VNode } from '../../src/vnode/type'

class MockRootContainer implements NodeContainer {
  root: HTMLElement | null = null

  appendChild(el: HTMLElement) {
    this.root = el
  }
}
describe(mount, () => {
  describe('children', () => {
    describe('子がテキスト', () => {
      it('HTMLの子要素がテキスト', () => {
        const tag = 'h1'
        const vNode: VNode = VNode.valueOf(
          tag,
          {
            id: 'test',
            class: 'test',
          },
          'Children'
        )

        const mockContainer = new MockRootContainer()
        mount(vNode, mockContainer)

        expect(
          mockContainer.root!.outerHTML
        ).toStrictEqual(
          '<h1 id="test" class="test">Children</h1>'
        )
      })
    })
    describe('子がVNode', () => {
      describe('HTMLの子要素がHTML', () => {
        const rootTag = 'h1'
        const vNode: VNode = VNode.valueOf(
          rootTag,
          {},
          [
            VNode.valueOf(
              'div',
              { id: 'div' },
              '子要素'
            ),
            VNode.valueOf(
              'span',
              { class: 'span' },
              [
                VNode.valueOf(
                  'label',
                  { class: 'label' },
                  '孫要素'
                )
              ]
            )
          ]
        )

        const mockContainer = new MockRootContainer()
        mount(vNode, mockContainer)

        it('HTML構造', () => {
          expect(
            mockContainer.root!.outerHTML
          ).toStrictEqual(`
            <h1>
                <div id="div">
                    子要素
                </div>
                <span class="span">
                    <label class="label">
                        孫要素
                    </label>
                </span>
            </h1>
          `.replace(/\s{2,}/g, ''))
        })
      })
    })
  })
})
