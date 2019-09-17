import { useEffect, useState, useRef, useCallback } from 'react'
import { createContainer } from 'unstated-next'

import createSynth from '../music/synth'
import { loop } from '../helpers'

function useMidi(keys, mute, arpeggiate) {
  const { current: play } = useRef(createSynth())

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
}

function useSynth() {
  const [keys, setKeys] = useState([])
  const [mute, setMute] = useState(true)
  const [arpeggiate, setArpeggiate] = useState(false)

  useMidi(keys, mute, arpeggiate)

  function clear() {
    setKeys([])
  }

  function toggleMute() {
    setMute(!mute)
  }

  function toggleArpeggiate() {
    setArpeggiate(!arpeggiate)
  }

  return {
    keys,
    mute,
    arpeggiate,
    setKeys,
    clear,
    toggleMute: useCallback(toggleMute, [mute]),
    toggleArpeggiate: useCallback(toggleArpeggiate, [arpeggiate])
  }
}

export default createContainer(useSynth)
