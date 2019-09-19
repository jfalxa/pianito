export function last(list) {
  return list[list.length - 1]
}

export function steps(scale) {
  return scale.reduce((t, d) => [...t, last(t) + d * 2], [0]).slice(0, -1)
}

export function percent(fraction) {
  return fraction * 100 + '%'
}

export function sequence(count) {
  return Array(count).fill(0).map((_, i) => i); // prettier-ignore
}

export function loop(array, action, duration = 750) {
  let index = 1

  action(array[0], 0)

  return setInterval(() => {
    action(array[index % array.length], index % array.length)
    index++
  }, duration)
}

export function unique(element, index, array) {
  return array.lastIndexOf(element) === index
}

export function combine([a, ...rest]) {
  if (rest.length === 0) return a.map(value => [value])

  const combined = []

  for (const value of a) {
    combine(rest).forEach(combinedRest =>
      combined.push([value, ...combinedRest])
    )
  }

  return combined
}

export function keyToNote(key) {
  return (9 + key) % 12
}

export function inputChange({ onChange, ...props }) {
  return { ...props, onChange: e => onChange(e.target.value) }
}
