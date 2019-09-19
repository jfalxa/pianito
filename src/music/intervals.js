import INTERVALS from '../config/intervals'
import { combine, keyToNote, unique } from '../helpers'

function findIntervals(halves) {
  return Object.keys(INTERVALS).filter(
    interval => INTERVALS[interval] % 12 === halves
  )
}

function sortIntervals(intervals) {
  return intervals.filter(unique).sort((a, b) => INTERVALS[a] - INTERVALS[b])
}

export function computeInterval(root, key) {
  const rootNote = keyToNote(root)
  const keyNote = keyToNote(key)

  let halves = keyNote - rootNote

  if (halves < 0) {
    halves += 12
  }

  return findIntervals(halves)
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
