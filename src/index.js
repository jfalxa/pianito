import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Keyboard from './components/keybord'

const App = () => {
  const [keys, setKeys] = useState([])

  return (
    <div>
      <Keyboard
        value={keys}
        onChange={setKeys}
        css={{ width: 800, height: 150 }}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
