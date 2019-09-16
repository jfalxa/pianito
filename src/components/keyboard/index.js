import React from 'react'

import KEYS from '../../config/keyboard'
import { sequence } from '../../helpers'
import { computeInterval } from '../../music/intervals'
import connectMIDI from '../../music/midi'

import { Box } from '../system'
import Key from './key'

const Board = Box.with({
  tabIndex: '1',
  width: '100%',
  height: '20%',
  outline: 'none',
  userSelect: 'none',
  b: '1px solid black',
  br: 'none'
})

class Keyboard extends React.Component {
  keys = sequence(88)

  componentDidMount() {
    connectMIDI(this.play, this.stop)
  }

  play = key => {
    const { value, onChange } = this.props
    onChange([...value, key])
  }

  stop = key => {
    const { value, onChange } = this.props
    onChange(value.filter(k => k !== key))
  }

  onKeyDown = e => {
    const key = KEYS[e.key]

    if (!key || e.repeat || this.isPressed(key)) return

    this.play(key)
  }

  onKeyUp = e => {
    const key = KEYS[e.key]

    if (!key || !this.isPressed(key)) return

    this.stop(key)
  }

  onMouseDown = e => {
    this.lastKey = parseInt(e.target.id, 10)

    if (isNaN(this.lastKey)) return

    if (this.props.toggle) {
      if (this.isPressed(this.lastKey)) {
        this.stop(this.lastKey)
      } else {
        this.play(this.lastKey)
      }
    } else {
      this.play(this.lastKey)
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    }
  }

  onMouseMove = e => {
    const key = parseInt(e.target.id, 10)

    if (isNaN(key) || this.lastKey === key) return

    this.stop(this.lastKey)
    this.play(key)

    this.lastKey = key
  }

  onMouseUp = () => {
    if (this.lastKey) {
      this.stop(this.lastKey)
      this.lastKey = null
    }

    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  isRoot(key) {
    return this.props.value[0] === key
  }

  isPressed(key) {
    return this.props.value.includes(key)
  }

  isChord(key) {
    return this.props.chordKeys.includes(key)
  }

  computeInterval(key) {
    if (this.props.value.length < 1) return null
    return computeInterval(key, this.props.value[0])
  }

  render() {
    return (
      <Board
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        onMouseDown={this.onMouseDown}
      >
        {this.keys.map(key => (
          <Key
            key={key}
            index={key}
            root={this.isRoot(key)}
            pressed={this.isPressed(key)}
            highlighted={this.isChord(key)}
            interval={this.computeInterval(key)}
          />
        ))}
      </Board>
    )
  }
}

export default Keyboard
