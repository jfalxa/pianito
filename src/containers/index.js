import React from 'react'

import Synth from './synth'
import Chords from './chords'
import Keyboard from './keyboard'

const Provider = ({ children }) => (
  <Synth.Provider>
    <Chords.Provider>
      <Keyboard.Provider>{children}</Keyboard.Provider>
    </Chords.Provider>
  </Synth.Provider>
)

export { Synth, Chords, Keyboard }
export default Provider
