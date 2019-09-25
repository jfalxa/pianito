import React from 'react'

import { Box } from '../system'
import Key from './key'
import Piano from '../../containers/piano'

const Board = Box.with({
  width: '100%',
  height: '20%',
  userSelect: 'none',
  b: '1px solid black',
  br: 'none'
})

const KeyboardDisplay = props => {
  const { ref, keys, notes } = Piano.useContainer()

  return (
    <Board {...props} ref={ref}>
      {keys.map(key => (
        <Key key={key} index={key} pressed={notes.has(key)} />
      ))}
    </Board>
  )
}
export default KeyboardDisplay
