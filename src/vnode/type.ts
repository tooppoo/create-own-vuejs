
export interface VNode {
  el: HTMLElement | null
  tag: Tag
  props: Props
  children: Children
}
export type Tag = string
export type Props = {
  [propName: string]: string
}
export type Children = VNode[] | string
