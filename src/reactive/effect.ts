
type Effect = () => void

let activeEffect: Effect | null = null

export const watchEffect = (effect: () => void) => {
  // effect内部で依存しているリアクティブオブジェクトにのみ
  // 反応する関数を生成する
  activeEffect = effect
  // effectの中で、リアクティブに対する依存(= getterアクセス)が生じる
  effect() 
  // また次のwatchEffectでは別のオブジェクトに反応する関数を作れるように破棄
  activeEffect = null
}

export interface Dependency {
  depend(): void
  notify(): void
}
export class ReactiveDependency implements Dependency {
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
