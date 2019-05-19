import React from 'react'

import KEYS from '../config/keyboard'
import { MAJOR } from '../config/scales'
import { sequence, steps, percent } from '../helpers'

import { Box } from './system'

const STEPS = steps(MAJOR)

const WHITE_WIDTH = 1 / 52
const BLACK_WIDTH = (2 / 3) * WHITE_WIDTH

const Board = Box.with({
  tabIndex: '1',
  width: '100%',
  height: '20%',
  b: '1px solid black',
  br: 'none'
})

const White = Box.with(({ pressed, ...props }) => ({
  ...props,
  width: percent(WHITE_WIDTH),
  br: '1px solid black',
  bg: pressed ? 'lightgrey' : 'white'
}))

const Black = Box.with(({ pressed, ...props }) => ({
  ...props,
  width: percent(BLACK_WIDTH),
  height: '66%',
  bg: pressed ? 'lightgrey' : 'black',
  zIndex: 1,
  b: '1px solid black',
  bt: 'none',
  mx: percent(-BLACK_WIDTH / 2)
}))

const Key = ({ index, pressed }) => {
  const note = (9 + index) % 12
  const Type = STEPS.includes(note) ? White : Black

  return <Type id={index} pressed={pressed} />
}

class Keyboard extends React.Component {
  keys = sequence(88)

  play(key) {
    const { value, onChange } = this.props
    onChange([...value, key])
  }

  stop(key) {
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

    this.play(this.lastKey)

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
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

  isPressed(key) {
    return this.props.value.includes(key)
  }

  render() {
    return (
      <Board
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        onMouseDown={this.onMouseDown}
      >
        {this.keys.map(key => (
          <Key key={key} index={key} pressed={this.isPressed(key)} />
        ))}
      </Board>
    )
  }
}

export default Keyboard
