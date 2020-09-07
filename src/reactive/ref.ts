import { reactive } from './reactive'

export type ReactivePrimitive = number | string | any[] | boolean
export function ref<T extends ReactivePrimitive>(value: T): { value: T } {
  return reactive({ value })
}
