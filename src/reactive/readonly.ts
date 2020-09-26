
export const readonly = <T extends object>(target: T): T => {
  return new Proxy(target, {
    set() {
      throw new Error(
        `overwrite not allowed because it is readonly`
      )
    }
  })
}
