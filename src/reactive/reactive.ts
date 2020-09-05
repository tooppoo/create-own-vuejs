import { ReactiveDependency } from './effect'

type CanReactive = { [key: string]: unknown }
export const reactive = <T extends CanReactive>(obj: T) => {
  Object.keys(obj).forEach((key) => {
    const deps = new ReactiveDependency()

    let value = obj[key]

    // 上書き？vue3ではProxyオブジェクト使ってたような
    Object.defineProperty(obj, key, {
      get() {
        deps.depend()

        return value
      },
      set(newValue: unknown) {
        if (newValue === value) {
          return
        }

        value = newValue
        deps.notify()
      }
    })

    return obj
  })
}
