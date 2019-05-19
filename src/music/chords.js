import CHORDS from '../config/chords'
import INVERSIONS from '../config/inversions'

import { noteToKey, keyToNote } from './converter'
import { ok } from '../helpers'

function applyInversion(chord, inversion) {
  switch (inversion) {
    case 'first_inversion': // third as lowest
      return chord.length > 3
        ? [chord[1] - 12, chord[2] - 12, chord[3] - 12, chord[0]]
        : [chord[1] - 12, chord[2] - 12, chord[0]]

    case 'second_inversion': // fifth as lowest
      return chord.length > 3
        ? [chord[2] - 12, chord[3] - 12, chord[0], chord[1]]
        : [chord[2] - 12, chord[0], chord[1]]

    case 'third_inversion': // seventh as lowest
      return chord.length > 3
        ? [chord[3] - 12, chord[0], chord[1], chord[2]]
        : chord

    case 'root_position':
    default:
      return chord
  }
}

export function getChord(keys) {
  const sorted = [...keys].sort()
  const steps = sorted.map(key => key - keys[0])
  const permutations = steps.map(root => steps.map(key => key - root))

  const matches = []

  permutations.forEach(permutation =>
    Object.keys(CHORDS).forEach(chord =>
      INVERSIONS.forEach((inversion, i) => {
        const invChord = applyInversion(CHORDS[chord], inversion)

        if (i < keys.length && permutation.join('-') === invChord.join('-')) {
          const root = permutation.indexOf(0)
          matches.push([keyToNote(sorted[root]), chord, `(${i})`].join(' '))
        }
      })
    )
  )

  return matches
}

export function buildChord(root, octave, type, inversion) {
  const key = noteToKey(root + octave)
  const chord = applyInversion(CHORDS[type], inversion)

  return chord.filter(ok).map(step => key + step)
}
