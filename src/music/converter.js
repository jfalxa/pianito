import { STEPS } from '../config/notes'

const STEP_NOTES = Object.keys(STEPS)
const STEP_VALUES = Object.values(STEPS)

function computeSteps(note, octave, shift) {
  const degree = STEPS[note]
  const halfStep = shift === '#' ? 1 : shift === 'b' ? -1 : 0

  return Number(octave) * 12 + degree + halfStep
}

export function noteToKey(note) {
  const members =
    note.length === 3 ? [note[0], note[2], note[1]] : [note[0], note[1]]

  return computeSteps(...members) - 9
}

export function keyToNote(key) {
  let note
  let shift = ''

  const octave = Math.floor((key + 9) / 12)
  const steps = (key + 9) % 12

  if (STEP_VALUES.includes(steps)) {
    note = STEP_NOTES.find(n => STEPS[n] === steps)
  } else {
    note = STEP_NOTES.find(n => STEPS[n] === steps - 1)
    shift = '#'
  }

  return note + shift + octave
}
