import { useLayoutEffect, useRef } from 'react'
import { listen } from '../../utils/hooks'

function getNote(key) {
  return parseInt(key.dataset.note, 10)
}

export default function useMouse(notes, { sustain }, node) {
  const played = useRef(null)

  useLayoutEffect(() => {
    if (!node.current) return

    function onMouseDown(e) {
      const note = getNote(e.target)

      if (sustain && notes.has(note)) {
        notes.stop(note)
        played.current = null
      } else {
        notes.play(note)
        played.current = note
      }
    }

    function onMouseUp() {
      if (sustain) return

      notes.stop(played.current)
      played.current = null
    }

    return listen(
      [node.current, { mousedown: onMouseDown }],
      [document, { mouseup: onMouseUp }]
    )
  }, [node.current, notes.list])
}
