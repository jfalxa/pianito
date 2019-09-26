import INTERVALS from '../config/intervals'
import { combine, keyToNote, unique } from '../utils/helpers'

function findIntervals(halves) {
  return Object.keys(INTERVALS).filter(
    interval => INTERVALS[interval] === halves
  )
}

function sortIntervals(intervals) {
  return intervals.filter(unique).sort((a, b) => INTERVALS[a] - INTERVALS[b])
}

function computeHalves(root, key) {
  const rootNote = keyToNote(root, 24)
  const keyNote = keyToNote(key, 24)

  const halves = keyNote - rootNote
  return halves < 0 ? halves + 24 : halves
}

export function computeIntervals(root, key, extendedOnly) {
  const halves = computeHalves(root, key)

  const intervals = findIntervals(halves % 12)
  const extended = findIntervals(halves % 24)

  return extendedOnly ? extended : [...intervals, ...extended].filter(unique)
}

export function listKeyIntervals(keys) {
  const keyIntervals = {}

  keys.forEach(root => {
    const intervals = keys.map(key => computeIntervals(root, key))
    keyIntervals[root] = combine(intervals).map(sortIntervals)
  })

  return keyIntervals
}
