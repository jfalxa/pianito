import { useEffect, useState, useMemo } from 'react'
import { createContainer } from 'unstated-next'

import NOTES from '../config/notes'
import { keyToNote, prettyChord } from '../utils/helpers'
import { listKeyChords, getClosestChord } from '../music/chords'
import Notes from './notes'

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

// select the chord matching the played notes
function useSelectChord(notes, setSelected) {
  useEffect(() => {
    const chord = getClosestChord(notes)

    if (chord) {
      setSelected(chord)
    }
  }, [notes])
}

// list the keys that are part of the selected chord
function useHighlightChord(selected, setKeys) {
  useEffect(() => {
    //
  }, [selected])
}

function useChords() {
  const notes = Notes.useContainer()

  const [selected, setSelected] = useState(undefined)
  const [keys, setKeys] = useState([])

  const list = useMemo(() => buildList(notes.list), [notes.list])

  useSelectChord(notes.list, setSelected)
  useHighlightChord(selected, setKeys)

  return {
    list,
    keys,
    selected,
    select: setSelected
  }
}

export default createContainer(useChords)
