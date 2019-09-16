import React from 'react'

import NOTES from '../config/notes'
import CHORDS from '../config/chords'
import { findChords, prettyChord } from '../music/chords'
import { Pane, Txt, Select } from './system'

function useChords(keys) {
  if (keys.length === 0) return { chords: [] }

  const root = (9 + keys[0]) % 12
  const note = NOTES[root]

  const chords = findChords(keys)
    .map(prettyChord)
    .map(chord => note + chord)

  return { chords }
}

const ChordSelect = Select.with({
  width: 140,
  height: 32,

  '&, & option': {
    fontSize: 21,
    fontWeight: 'bold'
  }
})

const Chords = ({ keys, ...props }) => {
  const { chords } = useChords(keys)

  return (
    <Pane {...props}>
      <ChordSelect
        disabled={chords.length === 0}
        options={chords}
        onChange={() => {}}
      />
    </Pane>
  )
}

export default Chords
