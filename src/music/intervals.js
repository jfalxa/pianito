import INTERVALS from '../config/intervals'
import { combine } from '../helpers'

function findIntervals(halves) {
  return Object.keys(INTERVALS).filter(
    interval => INTERVALS[interval] % 12 === halves
  )
}

export function degree(interval) {
  return parseInt(interval.replace(/b|#|M/, ''), 10)
}

export function sortIntervals(a, b) {
  const halvesA = degree(a) > 8 ? INTERVALS[a] + 12 : INTERVALS[a]
  const halvesB = degree(b) > 8 ? INTERVALS[b] + 12 : INTERVALS[b]

  return halvesA - halvesB
}

export function computeInterval(key, rootKey) {
  const note = (9 + key) % 12
  const root = (9 + rootKey) % 12

  let halves = note - root

  if (halves < 0) {
    halves += 12
  }

  return findIntervals(halves)
}

export function computeIntervals(keys) {
  if (keys.length < 1) return []

  const intervals = keys.map(key => computeInterval(key, keys[0]))

  return combine(intervals).map(interval => interval.sort(sortIntervals))
}
