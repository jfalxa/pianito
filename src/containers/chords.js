import { useLayoutEffect, useState, useMemo, useCallback } from 'react'
import { createContainer } from 'unstated-next'

import NOTES from '../config/notes'
import CHORDS from '../config/chords'
import { KEYS } from './piano'

import { Notes } from '.'
import { keyToNote, prettyChord } from '../utils/helpers'
import { listKeyChords } from '../music/chords'
import { computeIntervals } from '../music/intervals'

function parseSelected(selected) {
  if (!selected) return []

  const parsed = selected.split(',')
  const root = parseInt(parsed[0], 10)
  const chord = CHORDS[parsed[1]]
  const extended = chord.length > 4

  return [root, chord, extended]
}

function listChords(notes) {
  const chords = []
  const keyChords = listKeyChords(notes)

  Object.keys(keyChords).forEach(key => {
    const note = NOTES[keyToNote(key)].join('')
    const chordDetails = keyChords[key].map(chord => [key, note, chord])

    chords.push(...chordDetails)
  })

  return chords
}

function buildOptions(notes) {
  return listChords(notes).map(([key, note, chord]) => ({
    value: [key, chord].toString(),
    label: note + prettyChord(chord)
  }))
}

// list the keys that are part of the selected chord
function buildKeys(selected) {
  const [root, chord, extended] = parseSelected(selected)

  return KEYS.filter(key =>
    computeIntervals(root, key, extended).some(interval =>
      chord.includes(interval)
    )
  )
}

function useAutoSelect(options, setSelected) {
  useLayoutEffect(() => {
    if (options.length > 0) {
      setSelected(options[0].value)
    } else {
      setSelected('')
    }
  }, [options])
}

function useChords() {
  const notes = Notes.useContainer()

  const [selected, setSelected] = useState('')

  const options = useMemo(() => buildOptions(notes.list), [notes.list])
  const keys = useMemo(() => buildKeys(selected), [selected])

  useAutoSelect(options, setSelected)

  function has(key) {
    return keys.includes(key)
  }

  function root(key) {
    return selected.startsWith(`${key},`)
  }

  function intervals(key) {
    const [root, , extended] = parseSelected(selected)
    return computeIntervals(root, key, extended)
  }

  return {
    options,
    selected,
    select: setSelected,
    has: useCallback(has, [keys]),
    root: useCallback(root, [selected]),
    intervals: useCallback(intervals, [selected])
  }
}

export default createContainer(useChords)
