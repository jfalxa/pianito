import React, { useEffect } from 'react'

import NOTES from '../config/notes'
import { findChords, prettyChord, getChordKeys } from '../music/chords'
import { Pane, Select, Txt, Button } from './system'

const DEFAULT_OPTION = {
  value: 'none',
  label: 'Pick one',
  props: { disabled: true }
}

function useChords(keys, chord, setKeys, setChord) {
  if (keys.length === 0) return { chords: [], onPlay: () => {} }

  const root = (9 + keys[0]) % 12
  const note = NOTES[root].join(' ')

  const chords = findChords(keys)

  const chordOptions = chords.map(chord => ({
    value: chord,
    label: note + prettyChord(chord)
  }))

  useEffect(() => {
    if (!chords.includes(chord)) {
      setChord(chords[0] || 'none')
    }
  }, [keys])

  return {
    onPlay: () => setKeys(getChordKeys(chord, keys[0])),
    chords: chord && chords.length > 0 ? [DEFAULT_OPTION, ...chordOptions] : []
  }
}

const ChordSelect = Select.with({
  width: 200,
  height: 32,

  '&, & option': {
    fontSize: 21,
    fontWeight: 'bold'
  }
})

const Chords = ({ keys, chord, setKeys, setChord, ...props }) => {
  const { chords, onPlay } = useChords(keys, chord, setKeys, setChord)

  return (
    <Pane {...props}>
      <Txt mb={4}>Possible chords:</Txt>
      <ChordSelect
        value={chord}
        disabled={chords.length === 0}
        options={chords}
        onChange={setChord}
      />
      <Button
        disabled={!chord || chord === 'none'}
        onClick={onPlay}
        width={200}
        mt={4}
      >
        Play
      </Button>
    </Pane>
  )
}

export default Chords
