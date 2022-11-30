import React from 'react'
import ReactDOM from 'react-dom/client'
import {Card} from './components/Card'
import {Navbar} from './components/Navbar/Navbar'
import {Dash} from './components/Dashboard/dash'
import "./styles/main.css"

let array = ["Prédio 1", "Prédio 2", "Prédio 3", "Prédio 4", "Prédio 5"]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
        <Dash />
        <Navbar Prédio={array}/>
      <div className='caixapreta'>
        <Card />
      </div>
    </div>
  </React.StrictMode>
)