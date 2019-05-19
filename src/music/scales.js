import { steps } from '../helpers'
import { noteToKey } from './converter'

export function buildScale(tonic, scale) {
  const tonicKey = noteToKey(tonic)
  return steps(scale).map(step => tonicKey + step)
}

export function buildScaleChords(scale) {
  return scale.map((root, i) => [
    root,
    scale[(i + 2) % 7] + (i + 2 > 6 ? 12 : 0),
    scale[(i + 4) % 7] + (i + 4 > 6 ? 12 : 0)
  ])
}
