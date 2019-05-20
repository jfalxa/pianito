import { steps } from '../helpers'
import { noteToKey } from './converter'

const DEGREES = {
  I: 0,
  II: 1,
  III: 2,
  IV: 3,
  V: 4,
  VI: 5,
  VII: 6
}

export function buildScale(tonic, scale) {
  const tonicKey = noteToKey(tonic)
  return steps(scale).map(step => tonicKey + step)
}

export function buildScaleChords(scale) {
  return scale.map((root, i) => [
    root,
    scale[(i + 2) % 7] + (i + 2 >= 7 ? 12 : 0),
    scale[(i + 4) % 7] + (i + 4 >= 7 ? 12 : 0)
  ])
}

export function selectDegrees(scale, progression) {
  const degrees = progression.split(' ').map(degree => DEGREES[degree])
  return degrees.map(degree => scale[degree])
}
