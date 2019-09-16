import React from 'react'

import { computeChords } from '../music/chords'
import { Pane, Txt } from './system'

const Chords = ({ keys, ...props }) => {
  return (
    <Pane {...props}>
      {computeChords(keys).map(chord => (
        <Txt key={chord}>{chord}</Txt>
      ))}
    </Pane>
  )
}

export default Chords
