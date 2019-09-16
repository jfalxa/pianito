import CHORDS from '../config/chords'

import { combine, unique } from '../helpers'
import { computeIntervals } from './intervals'
import NOTES from '../config/notes'

function isChord(chord, intervals) {
  const simple = intervals.filter(unique)

  const hasEverything = simple.every(interval => chord.includes(interval))
  const hasLength = chord.length === simple.length

  return hasEverything && hasLength
}

export function computeChords(keys) {
  if (keys.length < 3) return []

  const root = (9 + keys[0]) % 12
  const notes = NOTES[root]

  const matches = computeIntervals(keys)
    .map(intervals =>
      Object.keys(CHORDS).find(chord => isChord(CHORDS[chord], intervals))
    )
    .filter(Boolean)
    .filter(unique)
    .map(chord => (chord === 'maj' ? '' : chord.replace('_', ' ')))

  return combine([notes, matches])
}
