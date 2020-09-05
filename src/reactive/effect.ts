
type Effect = () => void

let activeEffect: Effect | null = null

export const watchEffect = (fn: () => void) => {
  activeEffect = fn
  fn()
  activeEffect = null
}

class ReactiveDependency {
  private subscribers = new Set<Effect>()

  constructor(private _value: unknown) {}

  get value(): unknown {
    this.depend()

    return this._value
  }
  set value(newVal: unknown) {
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
