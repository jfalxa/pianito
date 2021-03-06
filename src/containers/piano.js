import { useRef } from 'react'
import { createContainer } from 'unstated-next'

import { sequence } from '../utils/helpers'
import { Notes, Chords } from '.'
import Inputs from '../hooks/inputs'
import useSynth from '../hooks/synth'
import useOptions from '../hooks/options'

export const KEYS = sequence(88)

function usePiano() {
  const notes = Notes.useContainer()
  const chords = Chords.useContainer()

  const ref = useRef(null)
  const options = useOptions()

  useSynth(notes.list, options)

  Inputs.useMouse(notes, options, ref)
  Inputs.useKeyboard(notes, options)
  Inputs.useMIDI(notes, options)

  return {
    ref,
    notes,
    chords,
    options,
    keys: KEYS
  }
}

export default createContainer(usePiano)
