import CHORDS from '../config/chords'
import INTERVALS from '../config/intervals'
import { listKeyIntervals } from './intervals'

function matchesChord(chord, intervals) {
  return intervals.every(interval => chord.includes(interval))
}

function isChord(chord, intervals) {
  const hasSameLength = chord.length === intervals.length
  const intervalsInChord = matchesChord(chord, intervals)

  return intervalsInChord && hasSameLength
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

export function getClosestChord(keys) {
  if (keys.length === 0) return {}

  const keyIntervals = listKeyIntervals(keys)
  const root = Object.keys(keyIntervals)[0]
  const chords = findChords(keyIntervals[root], isChord)

  return [root, chords[0]]
}

export function getChordKeys(root, chord) {
  const rootKey = parseInt(root, 10)
  return CHORDS[chord].map(interval => rootKey + INTERVALS[interval])
}
