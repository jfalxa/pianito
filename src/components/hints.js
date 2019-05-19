import React from 'react'

import { keyToNote } from '../music/converter'
import { getChord } from '../music/chords'
import { Txt, Box } from './system'

const Container = Box.with({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
})

const Notes = Txt.as('b').with(({ value }) => ({
  justifyContent: 'center',
  height: 24,
  children: value.map(keyToNote).join(' - ')
}))

const Chord = Txt.with(({ value }) => ({
  justifyContent: 'center',
  height: 24,
  children: value.length >= 3 && getChord(value)
}))

const Hint = ({ value }) => (
  <Container>
    <Notes value={value} />
    <Chord value={value} />
  </Container>
)

export default Hint
