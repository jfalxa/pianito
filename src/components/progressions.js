import React, { useState, useEffect } from 'react'

import { buildProgressions } from '../music/progressions'
import { Fieldset, Legend, Form, Button, TextArea } from './system'

let interval

const ProgTextArea = TextArea.with({
  flex: 1,
  width: '100%',
  fontSize: 8,
  mb: 8
})

const Progressions = ({ playSequence, ...props }) => {
  const [playing, setPlaying] = useState(false)
  const [progressions, setProgressions] = useState(
    'C4: I - IV - V\nA3m: IV - V - I'
  )

  const togglePlay = e => {
    e.preventDefault()
    setPlaying(!playing)
  }

  useEffect(() => {
    if (playing) {
      const chords = buildProgressions(progressions)
      interval = playSequence(chords)
    } else {
      clearInterval(interval)
      playSequence()
    }
  }, [playing])

  return (
    <Fieldset {...props}>
      <Legend>Progressions</Legend>

      <Form alignSelf="stretch">
        <ProgTextArea value={progressions} onChange={setProgressions} />
        <Button onClick={togglePlay}>{playing ? 'STOP' : 'PLAY'}</Button>
      </Form>
    </Fieldset>
  )
}

export default Progressions
