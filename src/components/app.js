import React, { useState, useEffect } from 'react'

import createSynth from '../music/synth'
import { loop } from '../helpers'

import { Screen } from './system'
import Chords from './chords'
import Keyboard from './keyboard'
import Options from './options'

const play = createSynth()

function useSynth() {
  const [keys, setKeys] = useState([])
  const [mute, setMute] = useState(true)
  const [arpeggiate, setArpeggiate] = useState(false)

  useEffect(() => {
    if (mute) return play([])

    if (arpeggiate) {
      const interval = loop(keys, (_, i) => play(keys.slice(0, i + 1)), 500)
      return () => clearInterval(interval)
    }

    return play(keys)
  }, [keys, mute, arpeggiate])

  return { keys, mute, arpeggiate, setKeys, setMute, setArpeggiate }
}

const App = () => {
  const synth = useSynth()

  return (
    <Screen>
      <Chords keys={synth.keys} />
      <Keyboard toggle value={synth.keys} onChange={synth.setKeys} />
      <Options
        mute={synth.mute}
        arpeggiate={synth.arpeggiate}
        setKeys={synth.setKeys}
        setMute={synth.setMute}
        setArpeggiate={synth.setArpeggiate}
      />
    </Screen>
  )
}

export default App
