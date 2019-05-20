import { ok } from '../helpers'
import { buildScale } from './scales'

const DEGREES = {
  I: 0,
  II: 1,
  III: 2,
  IV: 3,
  V: 4,
  VI: 5,
  VII: 6
}

function parseProgressions(progressions) {
  return progressions.split(`\n`).map(line => {
    const [tonic, degrees] = line.split(':')

    return [
      tonic.trim(),
      degrees
        .split('-')
        .map(d => d.trim())
        .map(degree => ({
          degree: DEGREES[degree.replace('7', '').toUpperCase()],
          seven: degree.includes('7')
        }))
    ]
  })
}

function buildChord(scale, degree, seven) {
  const chord = [
    scale[degree],
    scale[(degree + 2) % 7], // + (degree + 2 >= 7 ? 12 : 0),
    scale[(degree + 4) % 7], // + (degree + 4 >= 7 ? 12 : 0),
    seven && scale[(degree + 6) % 7] // + (degree + 6 >= 7 ? 12 : 0)
  ]

  return chord.filter(ok)
}

export function buildProgressions(progressions) {
  const chords = []

  parseProgressions(progressions).forEach(([tonic, degrees]) => {
    const type = tonic.includes('m') ? 'minor' : 'major'
    const scale = buildScale(tonic.replace('m', ''), type)

    const scaleChords = degrees.map(({ degree, seven }) =>
      buildChord(scale, degree, seven)
    )

    chords.push(...scaleChords)
  })

  return chords
}
