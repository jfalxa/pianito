import CHORDS from '../config/chords'
import INTERVALS from '../config/intervals'

import { unique } from '../helpers'
import { computeIntervals } from './intervals'

export function prettyChord(chord) {
  return chord === 'maj' ? '' : chord.replace('_', ' ')
}

export function matchesChord(chord, intervals) {
  const matchesChord = intervals.every(interval => chord.includes(interval))
  const matchesIntervals = chord.every(interval => intervals.includes(interval))

  return matchesChord || matchesIntervals
}

export function isChord(chord, intervals) {
  const simple = intervals.filter(unique)
  const hasSameLength = chord.length === simple.length
  const matchesChord = simple.every(interval => chord.includes(interval))

  return matchesChord && hasSameLength
}

export function findChords(keys) {
  const allIntervals = computeIntervals(keys)

  return Object.keys(CHORDS)
    .filter(chord =>
      allIntervals.some(intervals => matchesChord(CHORDS[chord], intervals))
    )
    .sort((a, b) => CHORDS[a].length - CHORDS[b].length)
}

export function getChordKeys(chord, root) {
  return CHORDS[chord].map(interval => root + INTERVALS[interval])
}
