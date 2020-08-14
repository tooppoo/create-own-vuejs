
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
  private _el: HTMLElement | null = null
  private constructor(
    readonly tag: Tag,
    readonly props: Props,
    readonly children: Children
  ) {
  }

  get el(): HTMLElement {
    return (this._el = document.createElement(this.tag))
  }
  set el(el: HTMLElement) {
    this._el = el
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
