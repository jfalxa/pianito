import { useEffect } from 'react'

import { loop } from '../utils/helpers'
import createSynth from '../music/synth'

const play = createSynth()

function playArpeggio(keys) {
  const sortedKeys = keys.concat().sort()
  const playSlice = (_, i) => play(sortedKeys.slice(0, i + 1))
  const interval = loop(sortedKeys, playSlice, 500)

  return () => clearInterval(interval)
}

export default function useSynth(notes, { mute, arpeggiate }) {
  useEffect(() => {
    if (mute) {
      return play([])
    } else if (arpeggiate) {
      return playArpeggio(notes)
    } else {
      return play(notes)
    }
  }, [notes, mute, arpeggiate])
}
