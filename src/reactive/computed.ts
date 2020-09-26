import { RefReactive, ref, ReactivePrimitive } from './ref'
import { watchEffect } from './effect'

export const computed =
  <T extends ReactivePrimitive>(f: () => T): Readonly<RefReactive<Readonly<T>>> => {
    let value: T

    watchEffect(() => {
      value = f()
    })

    return {
      get value(): T {
        return value
      }
    }
  }
