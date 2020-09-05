
export class VNode {
  static valueOf(
    tag: Tag,
    props: Props | null,
    children: Children
  ): VNode {
    return new VNode(
      tag,
      props || {},
      children
    )
  }
  public el: HTMLElement
  private constructor(
    readonly tag: Tag,
    readonly props: Props,
    readonly children: Children
  ) {
    this.el = document.createElement(this.tag)
  }

  sameTagWith(other: VNode): boolean {
    return this.tag === other.tag
  }
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
