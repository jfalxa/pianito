import React from 'react'
import ReactDOM from 'react-dom'

import { Box } from './components/system'
import Controller from './components/controller'

const Screen = Box.with({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center',
  p: 16
})

const App = () => (
  <Screen>
    <Controller />
  </Screen>
)

ReactDOM.render(<App />, document.getElementById('root'))
