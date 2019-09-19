import { useEffect, useState, useCallback } from 'react'
import { createContainer } from 'unstated-next'

import { Synth } from '.'
import NOTES from '../config/notes'
import { keyToNote } from '../helpers'

import {
  findPossibleChords,
  prettyChord,
  getChordKeys,
  findChord
} from '../music/chords'

const DEFAULT_OPTION = {
  value: 'none',
  label: 'Pick one',
  props: { disabled: true }
}

function isChord(chord) {
  return Boolean(chord) && chord !== 'none'
}

function createOptions(chords, key) {
  if (chords.length === 0) return []

  const root = keyToNote(key)
  const note = NOTES[root].join(' ')

  const options = chords.map(chord => ({
    value: chord,
    label: note + prettyChord(chord)
  }))

  return [DEFAULT_OPTION, ...options]
}

function useFilterChords(synth, selected, setSelected, setList) {
  useEffect(() => {
    // update selected chord and list
    const chords = findPossibleChords(synth.keys)
    const candidate = findChord(synth.keys)

    setList(createOptions(chords, synth.keys[0]))

    if (chords.length === 0) {
      setSelected(null)
    } else if (candidate) {
      setSelected(candidate)
    } else if (!chords.includes(selected)) {
      setSelected('none')
    }
  }, [synth.keys])
}

function useComputeKeys(synth, selected, setKeys) {
  useEffect(() => {
    if (!isChord(selected)) return setKeys([])

    if (synth.keys.length > 0) {
      setKeys(getChordKeys(selected, synth.keys[0]))
    }
  }, [selected])
}

function useChords() {
  const synth = Synth.useContainer()

  const [selected, setSelected] = useState(null)
  const [list, setList] = useState([])
  const [keys, setKeys] = useState([])

  useFilterChords(synth, selected, setSelected, setList)
  useComputeKeys(synth, selected, setKeys)

  return {
    selected,
    list,
    keys,
    setSelected,
    play: useCallback(() => synth.setKeys(keys), [keys])
  }
}

export default createContainer(useChords)
