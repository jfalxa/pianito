import CHORDS from '../config/chords'

import { unique } from '../helpers'
import { computeIntervals } from './intervals'

export function prettyChord(chord) {
  return chord === 'maj' ? '' : chord.replace('_', ' ')
}

export function isSubChord(chord, intervals) {
  return intervals.every(interval => chord.includes(interval))
}

export function isChord(chord, intervals) {
  const simple = intervals.filter(unique)
  const hasSameLength = chord.length === simple.length

  return isSubChord(chord, intervals) && hasSameLength
}

export function findChords(keys) {
  const allIntervals = computeIntervals(keys)

  return Object.keys(CHORDS)
    .filter(chord =>
      allIntervals.some(intervals => isSubChord(CHORDS[chord], intervals))
    )
    .sort((a, b) => CHORDS[a].length - CHORDS[b].length)
}
