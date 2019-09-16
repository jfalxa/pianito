import React from 'react'

import { MAJOR_STEPS } from '../../config/scales'
import { percent } from '../../helpers'

import { Box } from '../system'
import Info, { InfoContainer } from './info'

const WHITE_WIDTH = 1 / 52
const BLACK_WIDTH = (2 / 3) * WHITE_WIDTH

const White = Box.with(
  ({ note, interval, root, pressed, highlighted, ...props }) => ({
    ...props,
    children: <Info bottom note={note} interval={interval} show={pressed} />,
    position: 'relative',
    width: percent(WHITE_WIDTH),
    br: '1px solid black',
    bg: root ? 'green' : pressed ? 'grey' : highlighted ? 'lightgrey' : 'white',

    [`&:hover ${InfoContainer}`]: {
      display: 'flex'
    }
  })
)

const Black = Box.with(
  ({ note, interval, root, pressed, highlighted, ...props }) => ({
    ...props,
    children: <Info top note={note} interval={interval} show={pressed} />,
    position: 'relative',
    width: percent(BLACK_WIDTH),
    height: '66%',
    bg: root ? 'green' : pressed ? 'grey' : highlighted ? 'lightgrey' : 'black',
    zIndex: 1,
    b: '1px solid black',
    bt: 'none',
    mx: percent(-BLACK_WIDTH / 2),

    [`&:hover ${InfoContainer}`]: {
      display: 'flex'
    }
  })
)

const Key = ({ index, interval, root, pressed, highlighted }) => {
  const note = (9 + index) % 12
  const Type = MAJOR_STEPS.includes(note) ? White : Black

  return (
    <Type
      id={index}
      note={note}
      interval={interval}
      root={root}
      pressed={pressed}
      highlighted={highlighted}
    />
  )
}

export default Key
