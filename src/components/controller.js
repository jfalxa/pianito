import React, { useState, useEffect } from 'react'

import createSynth from '../music/synth'

import { Box } from './system'
import Keyboard from './keyboard'
import Chords from './chords'
import Hints from './hints'
import Scales from './scales'

const play = createSynth()

const Screen = Box.with({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  p: 16
})

const Controller = () => {
  const [keys, setKeys] = useState([])

  useEffect(() => play(keys), [keys])

  return (
    <Screen>
      <Box mb={8}>
        <Chords play={setKeys} />
        <Scales play={setKeys} />
      </Box>

      <Hints value={keys} mb={8} />
      <Keyboard value={keys} onChange={setKeys} />
    </Screen>
  )
}

export default Controller
