import CHORDS from '../config/chords'
import { listKeyIntervals } from './intervals'

function matchesChord(chord, intervals) {
  return intervals.every(interval => chord.includes(interval))
}

function findChords(potentialIntervals, predicate) {
  return Object.keys(CHORDS).filter(chord =>
    potentialIntervals.some(intervals => predicate(CHORDS[chord], intervals))
  )
}

function sortChords(chords) {
  return chords.concat().sort((a, b) => CHORDS[a].length - CHORDS[b].length)
}

export function listKeyChords(keys) {
  if (keys.length === 0) return {}

  const keyChords = {}
  const keyIntervals = listKeyIntervals(keys)

  Object.keys(keyIntervals).forEach(key => {
    const chords = findChords(keyIntervals[key], matchesChord)

    if (chords.length > 0) {
      keyChords[key] = sortChords(chords)
    }
  })

  return keyChords
}
