import { useState, useCallback } from 'react'

function useOptions() {
  const [mute, setMute] = useState(true)
  const [sustain, setSustain] = useState(false)
  const [arpeggiate, setArpeggiate] = useState(false)

  function toggleMute() {
    setMute(!mute)
  }

  function toggleSustain() {
    setSustain(!sustain)
  }

  function toggleArpeggiate() {
    setArpeggiate(!arpeggiate)
  }

  return {
    mute,
    sustain,
    arpeggiate,
    toggleMute: useCallback(toggleMute, [mute]),
    toggleSustain: useCallback(toggleSustain, [sustain]),
    toggleArpeggiate: useCallback(toggleArpeggiate, [arpeggiate])
  }
}

export default useOptions
