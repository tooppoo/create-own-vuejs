
export interface VNode {
  el?: HTMLElement
  tag: Tag
  props: Props
  children: Children
}
export interface MountedVNode extends VNode {
  el: HTMLElement
  children: MountedChildren
}
export type Tag = string
export type Props = {
  [propName: string]: string
}
export type Children = VNode[] | string
export type MountedChildren = MountedVNode[] | string
