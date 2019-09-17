import React from 'react'
import { Pane, Box, Button, Checkbox } from './system'
import { Synth } from '../containers'

const Options = props => {
  const synth = Synth.useContainer()

  return (
    <Pane {...props}>
      <Box mb={4}>
        {/* prettier-ignore */}
        <Checkbox 
          label="Mute" 
          checked={synth.mute} 
          onChange={synth.toggleMute} 
        />

        <Checkbox
          label="Arpeggiate"
          checked={synth.arpeggiate}
          onChange={synth.toggleArpeggiate}
        />
      </Box>

      <Button onClick={synth.clear} width={144}>
        Clear
      </Button>
    </Pane>
  )
}

export default Options
