import React, { useState, useEffect } from 'react'

import createSynth from '../music/synth'
import { loop } from '../helpers'

import { Screen } from './system'
import Chords from './chords'
import Keyboard from './keyboard'
import Options from './options'
import { getChordKeys } from '../music/chords'

const play = createSynth()

function useSynth() {
  const [keys, setKeys] = useState([])
  const [chord, setChord] = useState(null)
  const [mute, setMute] = useState(true)
  const [arpeggiate, setArpeggiate] = useState(false)

  useEffect(() => {
    if (mute) return play([])

    if (arpeggiate) {
      const sortedKeys = keys.concat().sort()
      const playSlice = (_, i) => play(sortedKeys.slice(0, i + 1))
      const interval = loop(sortedKeys, playSlice, 500)

      return () => clearInterval(interval)
    }

    return play(keys)
  }, [keys, mute, arpeggiate])

  // prettier-ignore
  const chordKeys = chord && chord !== 'none' && keys.length > 0 
    ? getChordKeys(chord, keys[0]) 
    : []

  return {
    keys,
    chord,
    chordKeys,
    mute,
    arpeggiate,
    setKeys,
    setChord,
    setMute,
    setArpeggiate
  }
}

const App = () => {
  const synth = useSynth()

  return (
    <Screen>
      <Chords
        keys={synth.keys}
        chord={synth.chord}
        setKeys={synth.setKeys}
        setChord={synth.setChord}
      />

      <Keyboard
        toggle
        value={synth.keys}
        chordKeys={synth.chordKeys}
        onChange={synth.setKeys}
      />

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
