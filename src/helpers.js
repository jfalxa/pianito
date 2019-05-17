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
