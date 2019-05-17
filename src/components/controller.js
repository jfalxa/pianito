import React, { useState, useEffect } from 'react'

import createSynth from '../music/synth'
import Keyboard from './keyboard'

const play = createSynth()

const Controller = () => {
  const [value, onChange] = useState([])

  useEffect(() => play(value), [value])

  return <Keyboard value={value} onChange={onChange} />
}

export default Controller
