import React from 'react'

import { Chords } from '../containers'
import { Pane, Select, Txt } from './system'

const ChordSelect = Select.with({
  width: 200,
  height: 32,

  '&, & option': {
    fontSize: 21,
    fontWeight: 'bold'
  }
})

const ChordsDisplay = props => {
  const chords = Chords.useContainer()

  return (
    <Pane {...props}>
      <Txt mb={4}>Possible chords:</Txt>
      <ChordSelect
        value={chords.selected}
        disabled={!chords.list.length}
        options={chords.list}
        onChange={chords.select}
      />
    </Pane>
  )
}

export default ChordsDisplay
