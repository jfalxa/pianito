import React from 'react'

import { Keyboard } from '../../containers'
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

const KeyboardDisplay = props => {
  const keyboard = Keyboard.useContainer()

  return (
    <Board
      {...props}
      onKeyDown={keyboard.onKeyDown}
      onKeyUp={keyboard.onKeyUp}
      onMouseDown={keyboard.onMouseDown}
    >
      {keyboard.keys.map(key => (
        <Key
          key={key}
          index={key}
          root={keyboard.isRoot(key)}
          pressed={keyboard.isPressed(key)}
          highlighted={keyboard.isChord(key)}
          interval={keyboard.getInterval(key)}
        />
      ))}
    </Board>
  )
}
export default KeyboardDisplay
