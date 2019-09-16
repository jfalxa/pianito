import React from 'react'
import { Pane, Box, Txt, Button, Input } from './system'

const Options = ({
  mute,
  arpeggiate,
  setKeys,
  setMute,
  setArpeggiate,
  ...props
}) => (
  <Pane {...props}>
    <Box mb={4}>
      <Txt as="label">
        <Input type="checkbox" checked={mute} onChange={() => setMute(!mute)} />
        Mute
      </Txt>

      <Txt as="label">
        <Input
          type="checkbox"
          checked={arpeggiate}
          onChange={() => setArpeggiate(!arpeggiate)}
        />
        Arpeggiate
      </Txt>
    </Box>

    <Button onClick={() => setKeys([])} width={144}>
      Clear
    </Button>
  </Pane>
)

export default Options
