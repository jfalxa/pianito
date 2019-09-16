import React from 'react'

import NOTES from '../config/notes'
import { findChords, prettyChord, getChordKeys } from '../music/chords'
import { Pane, Select } from './system'

function useChords(keys, setKeys) {
  if (keys.length === 0) return { chords: [] }

  const root = (9 + keys[0]) % 12
  const note = NOTES[root]

  const chords = findChords(keys).map(chord => ({
    value: chord,
    label: note + prettyChord(chord)
  }))

  function onChange(chord) {
    const chordKeys = getChordKeys(chord, keys[0])
    setKeys(chordKeys)
  }

  return { chords, onChange }
}

const ChordSelect = Select.with({
  width: 140,
  height: 32,

  '&, & option': {
    fontSize: 21,
    fontWeight: 'bold'
  }
})

const Chords = ({ keys, setKeys, ...props }) => {
  const { chords, onChange } = useChords(keys, setKeys)

  return (
    <Pane {...props}>
      <ChordSelect
        value={0}
        disabled={chords.length === 0}
        options={chords}
        onChange={onChange}
      />
    </Pane>
  )
}

export default Chords
