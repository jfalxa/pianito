import React, { useState, useEffect } from 'react'

import createSynth from '../music/synth'

import { Box } from './system'
import Keyboard from './keyboard'
import Chords from './chords'
import Hints from './hints'

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
      <Chords play={setKeys} mb={8} />
      <Hints value={keys} mt={8} />
      <Keyboard value={keys} onChange={setKeys} />
    </Screen>
  )
}

export default Controller
