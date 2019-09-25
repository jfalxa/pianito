import { useState, useCallback } from 'react'
import { createContainer } from 'unstated-next'

function useNotes() {
  const [notes, setNotes] = useState([])

  function has(note) {
    return notes.includes(note)
  }

  function play(note) {
    if (has(note)) return
    else setNotes([...notes, note])
  }

  function stop(note) {
    setNotes(notes.filter(played => played !== note))
  }

  function clear() {
    setNotes([])
  }

  return {
    list: notes,
    set: setNotes,
    has: useCallback(has, [notes]),
    play: useCallback(play, [notes]),
    stop: useCallback(stop, [notes]),
    clear: useCallback(clear, [setNotes])
  }
}

export default createContainer(useNotes)
