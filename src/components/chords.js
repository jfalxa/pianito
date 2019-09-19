import React from 'react'

import { Chords } from '../containers'
import { Pane, Select, Txt, Button } from './system'

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
  const empty = chords.options.length === 0

  return (
    <Pane {...props}>
      <Txt mb={4}>Possible chords:</Txt>
      <ChordSelect
        value={chords.selected}
        disabled={empty}
        options={chords.options}
        onChange={chords.setSelected}
      />
    </Pane>
  )
}

export default ChordsDisplay
