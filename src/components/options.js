import React from 'react'
import { Pane, Box, Button, Checkbox } from './system'
import { Piano } from '../containers'

const Options = props => {
  const { notes, options } = Piano.useContainer()

  return (
    <Pane {...props}>
      <Checkbox
        label="Mute"
        checked={options.mute}
        onChange={options.toggleMute}
        mb={4}
      />

      <Checkbox
        label="Sustain"
        checked={options.sustain}
        onChange={options.toggleSustain}
        mb={4}
      />

      <Checkbox
        label="Arpeggiate"
        checked={options.arpeggiate}
        onChange={options.toggleArpeggiate}
        mb={8}
      />

      <Button onClick={notes.clear} width={144}>
        Clear
      </Button>
    </Pane>
  )
}

export default Options
