import React, { useState, useEffect } from 'react'

import NOTES from '../config/notes'
import { buildScale } from '../music/scales'

import {
  Fieldset,
  Legend,
  Form,
  Row,
  Select,
  NumberField,
  Button
} from './system'

let interval

const Scales = ({ playSequence, ...props }) => {
  const [playing, setPlaying] = useState(false)
  const [tonic, setTonic] = useState('C')
  const [octave, setOctave] = useState(4)
  const [type, setType] = useState('major')

  const togglePlay = e => {
    e.preventDefault()
    setPlaying(!playing)
  }

  useEffect(() => {
    if (playing) {
      const scale = buildScale(tonic + octave, type)
      const sequence = scale.map(key => [key])
      interval = playSequence(sequence)
    } else {
      clearInterval(interval)
      playSequence()
    }
  }, [playing])

  return (
    <Fieldset {...props}>
      <Legend>Scales</Legend>

      <Form alignSelf="stretch">
        <Row>
          <Select value={tonic} options={NOTES} onChange={setTonic} />

          <NumberField
            value={octave}
            min={0}
            max={7}
            step={1}
            onChange={setOctave}
          />
        </Row>

        <Select value={type} options={['major', 'minor']} onChange={setType} />

        <Button onClick={togglePlay}>{playing ? 'STOP' : 'PLAY'}</Button>
      </Form>
    </Fieldset>
  )
}

export default Scales
