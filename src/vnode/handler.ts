import { Children, Props, Tag, VNode } from './type'

export interface NodeContainer {
  appendChild(el: HTMLElement): void
}
export const globalContainer: NodeContainer = {
  appendChild(el: HTMLElement) {
    console.log(el)
  }
}

export function h(tag: Tag, props: Props, children: Children): VNode {
  return {
    tag,
    props,
    children
  }
}

export function mount(
  vNode: VNode,
  container: NodeContainer = globalContainer
) {
  const el = (vNode.el = document.createElement(vNode.tag))

  Object.entries(vNode.props).forEach(([name, value]) =>
    el.setAttribute(name, value)
  )

  if (typeof vNode.children === 'string') {
    el.textContent = vNode.children // 再起適用の終了条件
  } else {
    vNode.children.forEach(child =>
      mount(child, el) // 親要素が次のcontainer
    )
  }

  container.appendChild(el)
}
