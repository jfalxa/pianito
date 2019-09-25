import React from 'react'

import Notes from './notes'
import Chords from './chords'
import Piano from './piano'

const Provider = ({ children }) => (
  <Notes.Provider>
    <Chords.Provider>
      <Piano.Provider>{children}</Piano.Provider>
    </Chords.Provider>
  </Notes.Provider>
)

export { Notes, Chords, Piano }
export default Provider
