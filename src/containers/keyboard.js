import { useEffect, useRef, useCallback } from 'react'
import { createContainer } from 'unstated-next'

import { Synth, Chords } from '.'
import KEYS from '../config/keyboard'
import { sequence } from '../helpers'
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

  function _isRoot(key) {
    return synth.keys[0] === key
  }

  function _isPressed(key) {
    return synth.keys.includes(key)
  }

  function _isChord(key) {
    return chords.keys.includes(key)
  }

  function _getInterval(key) {
    if (synth.keys.length === 0) return null
    return computeInterval(key, synth.keys[0])
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
  const isRoot = useCallback(_isRoot, [synth.keys])
  const isPressed = useCallback(_isPressed, [synth.keys])
  const isChord = useCallback(_isChord, [chords.keys])
  const getInterval = useCallback(_getInterval, [synth.keys])
  const onKeyDown = useCallback(_onKeyDown, [synth.keys])
  const onKeyUp = useCallback(_onKeyUp, [synth.keys])
  const onMouseDown = useCallback(_onMouseDown, [synth.keys])

  return {
    keys: keys.current,
    play,
    stop,
    isRoot,
    isPressed,
    isChord,
    getInterval,
    onKeyDown,
    onKeyUp,
    onMouseDown
  }
}

export default createContainer(useKeyboard)
