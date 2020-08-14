
export interface VNode {
  el?: HTMLElement
  tag: Tag
  props: Props
  children: Children
}
export interface MountedVNode extends VNode {
  el: HTMLElement
}
export type Tag = string
export type Props = {
  [propName: string]: string
}
export type Children = VNode[] | string
