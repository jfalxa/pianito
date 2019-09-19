import { useEffect, useState, useCallback } from 'react'
import { createContainer } from 'unstated-next'

import { Synth } from '.'
import NOTES from '../config/notes'
import { keyToNote, prettyChord } from '../helpers'
import { getChordKeys, listKeyChords, isValidChord } from '../music/chords'

const DEFAULT_OPTION = {
  value: 'none',
  label: 'Pick one',
  props: { disabled: true }
}

function listChords(keyChords) {
  const list = []

  Object.keys(keyChords).forEach(key => {
    const note = NOTES[keyToNote(key)].join('')
    const chords = keyChords[key].map(chord => [key, note, chord])

    list.push(...chords)
  })

  return list
}

function createOptions(chords) {
  if (chords.length === 0) return []

  const options = chords.map(([key, note, chord]) => ({
    value: [key, chord],
    label: note + prettyChord(chord)
  }))

  return [DEFAULT_OPTION, ...options]
}

function createCandidate([key, , chord]) {
  return [key, chord].join()
}

function hasChord(candidate, chords) {
  return chords.findIndex(chord => candidate === createCandidate(chord)) >= 0
}

function useFilterChords(synth, selected, setSelected, setOptions) {
  useEffect(() => {
    // update selected chord and list
    const keyChords = listKeyChords(synth.keys)
    const chords = listChords(keyChords)

    // prettier-ignore
    const candidate =
      chords.length === 0
        ? 'none'
        : hasChord(selected, chords)
          ? selected
          : createCandidate(chords[0])

    setSelected(candidate || 'none')
    setOptions(createOptions(chords))
  }, [synth.keys])
}

function useComputeKeys(selected, setKeys) {
  useEffect(() => {
    if (selected === 'none') return setKeys([])
    const [root, chord] = selected.split(',')
    setKeys(getChordKeys(root, chord))
  }, [selected])
}

function useChords() {
  const synth = Synth.useContainer()

  const [selected, setSelected] = useState('none')
  const [options, setOptions] = useState([])
  const [keys, setKeys] = useState([])

  useFilterChords(synth, selected, setSelected, setOptions)
  useComputeKeys(selected, setKeys)

  return {
    selected,
    options,
    keys,
    setSelected
  }
}

export default createContainer(useChords)
