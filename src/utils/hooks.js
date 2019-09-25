export function listen(...emitters) {
  emitters.forEach(([emitter, callbacks]) => {
    for (const event in callbacks) {
      emitter.addEventListener(event, callbacks[event])
    }
  })

  return () => {
    emitters.forEach(([emitter, callbacks]) => {
      for (const event in callbacks) {
        emitter.removeEventListener(event, callbacks[event])
      }
    })
  }
}
