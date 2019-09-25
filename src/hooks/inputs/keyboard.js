import { useLayoutEffect } from 'react'

import KEYBOARD from '../../config/keyboard'
import { listen } from '../../utils/hooks'

export default function useKeyboard(notes, { sustain }) {
  useLayoutEffect(() => {
    function onKeyDown(e) {
      if (e.repeat || !KEYBOARD[e.key]) return

      const note = KEYBOARD[e.key]

      if (sustain && notes.has(note)) {
        notes.stop(note)
      } else {
        notes.play(note)
      }
    }

    function onKeyUp(e) {
      if (sustain || !KEYBOARD[e.key]) return

      const note = KEYBOARD[e.key]
      notes.stop(note)
    }

    return listen([document, { keydown: onKeyDown, keyup: onKeyUp }])
  }, [notes.list])
}
