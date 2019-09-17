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

  return (
    <Pane {...props}>
      <Txt mb={4}>Possible chords:</Txt>
      <ChordSelect
        value={chords.selected}
        disabled={chords.list.length === 0}
        options={chords.list}
        onChange={chords.setSelected}
      />
      <Button
        disabled={!chords.selected}
        onClick={chords.play}
        width={200}
        mt={4}
      >
        Play
      </Button>
    </Pane>
  )
}

export default ChordsDisplay
