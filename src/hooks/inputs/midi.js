import { useEffect, useLayoutEffect } from 'react'
import { listen } from '../../utils/hooks'
import setupMIDIEvents from '../../utils/midi'

export default function useMIDI(notes, { sustain }) {
  useEffect(() => {
    setupMIDIEvents(document)
  }, [])

  useLayoutEffect(() => {
    function onMIDIDown(e) {
      const note = e.detail.key

      if (sustain && notes.has(note)) {
        notes.stop(note)
      } else {
        notes.play(note)
      }
    }

    function onMIDIUp(e) {
      if (sustain) return

      const note = e.detail.key
      notes.stop(note)
    }

    return listen([document, { mididown: onMIDIDown, midiup: onMIDIUp }])
  }, [notes.list])
}
