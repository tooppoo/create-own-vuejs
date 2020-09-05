
type Effect = () => void

let activeEffect: Effect | null = null

export const watchEffect = (fn: () => void) => {
  activeEffect = fn
  fn()
  activeEffect = null
}

export class ReactiveDependency {
  private subscribers = new Set<Effect>()

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }

  notify() {
    this.subscribers.forEach(subscriber => subscriber())
  }
}
