import React, { useState, useEffect } from 'react'

import createSynth from '../music/synth'

import { Box } from './system'
import Keyboard from './keyboard'
import Hints from './hints'
import Chords from './chords'
import Scales from './scales'
import Progressions from './progressions'
import { loop } from '../helpers'

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
    flex: '1 0',

    form: {
      height: 100
    },

    button: {
      mt: 'auto'
    }
  }
})

const Controller = () => {
  const [keys, setKeys] = useState([])

  const playSequence = sequence =>
    sequence ? loop(sequence, setKeys) : setKeys([])

  useEffect(() => play(keys), [keys])

  return (
    <Screen>
      <Forms mb={8}>
        <Chords play={setKeys} />
        <Scales playSequence={playSequence} />
        <Progressions playSequence={playSequence} />
      </Forms>

      <Hints value={keys} mb={8} />
      <Keyboard value={keys} onChange={setKeys} />
    </Screen>
  )
}

export default Controller
