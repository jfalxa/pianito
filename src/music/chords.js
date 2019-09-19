import CHORDS from '../config/chords'
import INTERVALS from '../config/intervals'
import { listKeyIntervals } from './intervals'

export function isValidChord(chord) {
  return chord in CHORDS
}

export function matchesChord(chord, intervals) {
  const intervalsInChord = intervals.every(interval => chord.includes(interval))
  const chordInIntervals = chord.every(interval => intervals.includes(interval))

  return intervalsInChord || chordInIntervals
}

export function isChord(chord, intervals) {
  const hasSameLength = chord.length === intervals.length
  const intervalsInChord = intervals.every(interval => chord.includes(interval))

  return intervalsInChord && hasSameLength
}

export function findPotentialChords(potentialIntervals) {
  return Object.keys(CHORDS).filter(chord =>
    potentialIntervals.some(intervals => isChord(CHORDS[chord], intervals))
  )
}

export function sortChords(chords) {
  return chords.concat().sort((a, b) => CHORDS[a].length - CHORDS[b].length)
}

export function listKeyChords(keys) {
  if (keys.length === 0) return {}

  const keyChords = {}
  const keyIntervals = listKeyIntervals(keys)

  Object.keys(keyIntervals).forEach(key => {
    const chords = findPotentialChords(keyIntervals[key])

    if (chords.length > 0) {
      keyChords[key] = sortChords(chords)
    }
  })

  return keyChords
}

export function getChordKeys(root, chord) {
  const rootKey = parseInt(root, 10)
  return CHORDS[chord].map(interval => rootKey + INTERVALS[interval])
}
