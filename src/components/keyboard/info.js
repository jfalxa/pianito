import React from 'react'

import NOTES from '../../config/notes'
import { Box, Txt } from '../system'

export const InfoContainer = Box.with(({ show, bottom, top, ...props }) => ({
  ...props,
  display: show ? 'flex' : 'none',
  position: 'absolute',
  flexDirection: top ? 'column-reverse' : 'column',
  top: bottom ? '100%' : 'initial',
  bottom: top ? '100%' : 'initial',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  my: 8
}))

const Info = ({ note, interval, ...props }) => (
  <InfoContainer {...props}>
    {NOTES[note].map(n => (
      <Txt key={n}>{n}</Txt>
    ))}

    {interval &&
      interval.map(int => (
        <Txt key={int} color="red">
          {int}
        </Txt>
      ))}
  </InfoContainer>
)

export default Info
