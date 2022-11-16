import React from 'react'
import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="Layout">
        <div className="Top">
          <h1>Dispositivos</h1>
          <div className="Search">
            <i class="material-icons">search</i>
            <input type="text" placeholder='Pesquise por dispositivo' />
          </div>
        </div>
        <div className="Card">
          <i class="material-icons">desktop_windows</i>
          <div className="Model">
            <h3>ESP 32</h3>
          </div>
          <div className="Status">
            <h4>Active for 3 hours</h4>
            <h4>100%</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
