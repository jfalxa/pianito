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

export function computeInterval(root, key) {
  const halves = computeHalves(root, key)

  const intervals = findIntervals(halves % 12)
  const extended = findIntervals(halves % 24)

  return [...extended, ...intervals]
}

export function listKeyIntervals(keys) {
  if (keys.length === 0) return {}

  const keyIntervals = {}

  keys.forEach(root => {
    const intervals = keys.map(key => computeInterval(root, key))
    keyIntervals[root] = combine(intervals).map(sortIntervals)
  })

  return keyIntervals
}
