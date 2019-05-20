import React, { useState, useEffect } from 'react'

import NOTES from '../config/notes'
import CHORDS from '../config/chords'
import INVERSIONS from '../config/inversions'
import { buildChord } from '../music/chords'
import {
  Fieldset,
  Legend,
  Form,
  Row,
  Select,
  NumberField,
  Button
} from './system'

const CHORD_NAMES = Object.keys(CHORDS)

const Chords = ({ play, ...props }) => {
  const [playing, setPlaying] = useState(false)
  const [root, setRoot] = useState('C')
  const [octave, setOctave] = useState(4)
  const [type, setType] = useState('major')
  const [inversion, setInversion] = useState('root_position')

  const chord = buildChord(root, octave, type, inversion)

  const togglePlay = e => {
    e.preventDefault()
    setPlaying(!playing)
  }

  useEffect(() => {
    if (playing) {
      play(chord)
    } else {
      play([])
    }
  }, [playing, root, octave, type, inversion])

  return (
    <Fieldset {...props}>
      <Legend>Chords</Legend>
      <Form>
        <Row>
          <Select value={root} options={NOTES} onChange={setRoot} />

          <NumberField
            value={octave}
            min={0}
            max={7}
            step={1}
            onChange={setOctave}
          />
        </Row>

        <Select value={type} options={CHORD_NAMES} onChange={setType} />

        <Select
          value={inversion}
          options={INVERSIONS}
          onChange={setInversion}
          mt={8}
        />

        <Button onClick={togglePlay} mt={8}>
          {playing ? 'STOP' : 'PLAY'}
        </Button>
      </Form>
    </Fieldset>
  )
}

export default Chords
