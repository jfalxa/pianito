import React, { useState, useEffect } from 'react'

import NOTES from '../config/notes'
import { MAJOR, MINOR } from '../config/scales'
import { buildScaleChords, buildScale } from '../music/scales'

import {
  Fieldset,
  Legend,
  Form,
  Row,
  Select,
  NumberField,
  Button
} from './system'

const SCALES = { major: MAJOR, minor: MINOR }

let timeout

function playSequence(play, [first = [], ...rest]) {
  play(first)

  if (first.length === 0) return

  timeout = setTimeout(() => {
    playSequence(play, rest)
  }, 1000)
}

function playScaleChords(play, tonic, type) {
  const scale = buildScale(tonic, SCALES[type])
  const chords = buildScaleChords(scale)

  playSequence(play, chords)
}

const Scales = ({ play, ...props }) => {
  const [playing, setPlaying] = useState(false)
  const [tonic, setTonic] = useState('C')
  const [octave, setOctave] = useState(4)
  const [scale, setScale] = useState('major')

  const togglePlay = e => {
    e.preventDefault()

    if (timeout) {
      clearTimeout(timeout)
    }

    setPlaying(!playing)
  }

  useEffect(() => {
    if (playing) {
      playScaleChords(play, tonic + octave, scale)
    } else {
      play([])
    }
  }, [playing])

  return (
    <Fieldset {...props}>
      <Legend>Scale chords</Legend>
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

        <Select
          value={scale}
          options={['major', 'minor']}
          onChange={setScale}
        />

        <Button onClick={togglePlay} mt={35}>
          {playing ? 'STOP' : 'PLAY'}
        </Button>
      </Form>
    </Fieldset>
  )
}

export default Scales
