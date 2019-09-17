import React from 'react'

import Provider from '../containers'
import { Screen } from './system'
import Chords from './chords'
import Keyboard from './keyboard'
import Options from './options'

const App = () => (
  <Provider>
    <Screen>
      <Chords />
      <Keyboard />
      <Options />
    </Screen>
  </Provider>
)

export default App
