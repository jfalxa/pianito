import { useEffect, useRef, useCallback } from 'react'
import { createContainer } from 'unstated-next'

import { Synth, Chords } from '.'
import KEYS from '../config/keyboard'
import { sequence, keyToNote } from '../helpers'
import { computeInterval } from '../music/intervals'
import connectMIDI from '../music/midi'

function useKeyboard() {
  const synth = Synth.useContainer()
  const chords = Chords.useContainer()

  const keys = useRef(sequence(88))

  function _play(key) {
    synth.setKeys([...synth.keys, key])
  }

  function _stop(key) {
    synth.setKeys(synth.keys.filter(k => k !== key))
  }

  function _isPressed(key) {
    return synth.keys.includes(key)
  }

  function _isChordRoot(key) {
    return chords.keys[0] === key
  }

  function _isChordNote(key) {
    return chords.keys.some(chordKey => keyToNote(chordKey) === keyToNote(key))
  }

  function _getInterval(key) {
    if (chords.keys.length === 0) return null
    return computeInterval(chords.keys[0], key)
  }

  function _onKeyDown(e) {
    const key = KEYS[e.key]
    if (!key || e.repeat || isPressed(key)) return
    play(key)
  }

  function _onKeyUp(e) {
    const key = KEYS[e.key]
    if (!key || !isPressed(key)) return
    stop(key)
  }

  function _onMouseDown(e) {
    const key = parseInt(e.target.id, 10)

    if (isNaN(key)) return

    if (isPressed(key)) {
      stop(key)
    } else {
      play(key)
    }
  }

  useEffect(() => {
    connectMIDI(play, stop)
  }, [])

  const play = useCallback(_play, [synth.keys])
  const stop = useCallback(_stop, [synth.keys])
  const isPressed = useCallback(_isPressed, [synth.keys])
  const isChordRoot = useCallback(_isChordRoot, [chords.keys])
  const isChordNote = useCallback(_isChordNote, [chords.keys])
  const getInterval = useCallback(_getInterval, [chords.keys])
  const onKeyDown = useCallback(_onKeyDown, [synth.keys])
  const onKeyUp = useCallback(_onKeyUp, [synth.keys])
  const onMouseDown = useCallback(_onMouseDown, [synth.keys])

  return {
    keys: keys.current,
    play,
    stop,
    isPressed,
    isChordRoot,
    isChordNote,
    getInterval,
    onKeyDown,
    onKeyUp,
    onMouseDown
  }
}

export default createContainer(useKeyboard)
