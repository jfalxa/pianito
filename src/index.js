import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Keyboard from './components/keyboard'

const App = () => {
  const [keys, setKeys] = useState([])

  return (
    <div
      css={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Keyboard
        value={keys}
        onChange={setKeys}
        css={{ width: 800, height: 150 }}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
