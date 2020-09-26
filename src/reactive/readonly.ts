import { CanReactive, reactive } from './reactive'

export const readonly = <T extends CanReactive>(target: T): T => {
  const reactivated = reactive<T>(target)

  return new Proxy(reactivated, {
    set() {
      throw new Error(
        `overwrite not allowed because it is readonly`
      )
    }
  })
}
