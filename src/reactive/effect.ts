
type Effect = () => void

let activeEffect: Effect | null = null

export const watchEffect = (fn: () => void) => {
  activeEffect = fn
  fn()
  activeEffect = null
}

export class ReactiveDependency<T> {
  private subscribers = new Set<Effect>()

  constructor(private _value: T) {}

  get value(): T {
    this.depend()

    return this._value
  }
  set value(newVal: T) {
    this._value = newVal

    this.notify()
  }

  private depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }

  private notify() {
    this.subscribers.forEach(subscriber => subscriber())
  }
}
