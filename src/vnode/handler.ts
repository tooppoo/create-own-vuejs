import { Children, Props, Tag, VNode } from './type'

export function h(tag: Tag, props: Props, children: Children): VNode {
  return {
    el: null,
    tag,
    props,
    children
  }
}
