import React, { useState, useEffect } from 'react'

import NOTES from '../config/notes'
import { MAJOR, MINOR } from '../config/scales'
import {
  buildScaleChords,
  buildScale,
  selectDegrees
} from '../music/progressions'

import {
  Fieldset,
  Legend,
  Form,
  Row,
  Select,
  NumberField,
  Button,
  Input
} from './system'

const SCALES = { major: MAJOR, minor: MINOR }

let timeout

function playSequence(play, sequence, whole = sequence) {
  const [first = [], ...rest] = sequence

  play([])
  play(first)

  timeout = setTimeout(() => {
    const nextSequence = rest.length > 0 ? rest : whole
    playSequence(play, nextSequence, whole)
  }, 1000)
}

function playProgression(play, tonic, type, progression) {
  const scale = buildScale(tonic, SCALES[type])
  const chords = buildScaleChords(scale)
  const progChords = selectDegrees(chords, progression)

  playSequence(play, progChords)
}

const Progressions = ({ play, ...props }) => {
  const [playing, setPlaying] = useState(false)
  const [tonic, setTonic] = useState('C')
  const [octave, setOctave] = useState(4)
  const [scale, setScale] = useState('major')
  const [progression, setProgression] = useState('I IV V')

  const togglePlay = e => {
    e.preventDefault()

    if (timeout) {
      clearTimeout(timeout)
    }

    setPlaying(!playing)
  }

  useEffect(() => {
    if (playing) {
      playProgression(play, tonic + octave, scale, progression)
    } else {
      play([])
    }
  }, [playing])

  return (
    <Fieldset {...props}>
      <Legend>Progressions</Legend>

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

        <Input
          value={progression}
          onChange={setProgression}
          width="100%"
          mt={8}
        />

        <Button onClick={togglePlay} mt={8}>
          {playing ? 'STOP' : 'PLAY'}
        </Button>
      </Form>
    </Fieldset>
  )
}

export default Progressions
