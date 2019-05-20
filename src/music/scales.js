import { steps } from '../helpers'
import { noteToKey } from './converter'
import { MAJOR, MINOR } from '../config/scales'

export function buildScale(tonic, type) {
  const tonicKey = noteToKey(tonic)
  const scale = type === 'major' ? MAJOR : MINOR
  return steps(scale).map(step => tonicKey + step)
}
