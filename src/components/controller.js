import React, { useState, useEffect } from 'react'

import createSynth from '../music/synth'

import { Box } from './system'
import Keyboard from './keyboard'
import Chords from './chords'
import Hints from './hints'
import Progressions from './progressions'

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

const Forms = Box.with({
  width: 400,

  '& > *': {
    flexShrink: 0,
    width: '50%'
  }
})

const Controller = () => {
  const [keys, setKeys] = useState([])

  useEffect(() => play(keys), [keys])

  return (
    <Screen>
      <Forms mb={8}>
        <Chords play={setKeys} />
        <Progressions play={setKeys} />
      </Forms>

      <Hints value={keys} mb={8} />
      <Keyboard value={keys} onChange={setKeys} />
    </Screen>
  )
}

export default Controller
