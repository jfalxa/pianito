import { useState, useMemo } from 'react'
import { createContainer } from 'unstated-next'

import NOTES from '../config/notes'
import Notes from './notes'
import { listKeyChords } from '../music/chords'
import { keyToNote, prettyChord } from '../utils/helpers'

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

function buildList(notes) {
  return listChords(notes).map(([key, note, chord]) => ({
    value: [key, chord],
    label: note + prettyChord(chord)
  }))
}

function useChords() {
  const notes = Notes.useContainer()

  const [selected, setSelected] = useState(undefined)
  const list = useMemo(() => buildList(notes.list), [notes.list])

  return {
    list,
    selected,
    select: setSelected
  }
}

export default createContainer(useChords)
