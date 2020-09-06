import { ReactiveDependency } from './effect'

type CanReactive = { [key: string]: unknown }
export const reactive = <T extends CanReactive>(obj: T): T => {
  const depsMap: { [key: string]: ReactiveDependency } = {}

  return new Proxy(obj, {
    get(target, prop: string) {
      const deps = depsMap[prop] || (depsMap[prop] = new ReactiveDependency())

      deps.depend()

      return target[prop]
    },
    set(target, prop: keyof T, newValue) {
      if (target[prop] === newValue) return true

      target[prop] = newValue

      const deps = depsMap[prop as string]
      if (deps) {
        deps.notify()
      }

      return true
    }
  })
}
