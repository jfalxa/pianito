import React from 'react'

import { MAJOR_STEPS } from '../../config/scales'
import { percent, keyToNote } from '../../utils/helpers'

import { Box } from '../system'
import Info, { InfoContainer } from './info'

const WHITE_WIDTH = 1 / 52
const BLACK_WIDTH = (2 / 3) * WHITE_WIDTH

const White = Box.with(
  ({ note, intervals, root, pressed, highlighted, ...props }) => ({
    ...props,
    children: <Info bottom note={note} intervals={intervals} show={pressed} />,
    position: 'relative',
    width: percent(WHITE_WIDTH),
    br: '1px solid black',
    bg: root ? 'red' : pressed ? 'lime' : highlighted ? 'lightgray' : 'white',

    [`&:hover ${InfoContainer}`]: {
      display: 'flex'
    }
  })
)

const Black = Box.with(
  ({ note, intervals, root, pressed, highlighted, ...props }) => ({
    ...props,
    children: <Info top note={note} intervals={intervals} show={pressed} />,
    position: 'relative',
    width: percent(BLACK_WIDTH),
    height: '66%',
    bg: root ? 'red' : pressed ? 'lime' : highlighted ? 'lightgray' : 'black',
    zIndex: 1,
    b: '1px solid black',
    bt: 'none',
    mx: percent(-BLACK_WIDTH / 2),

    [`&:hover ${InfoContainer}`]: {
      display: 'flex'
    }
  })
)

const Key = ({ index, intervals, root, pressed, highlighted }) => {
  const note = keyToNote(index)
  const Type = MAJOR_STEPS.includes(note) ? White : Black

  return (
    <Type
      data-note={index}
      note={note}
      intervals={intervals}
      root={root}
      pressed={pressed}
      highlighted={highlighted}
    />
  )
}

export default Key
