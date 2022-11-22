import React from 'react'
import ReactDOM from 'react-dom/client'
import {Card} from './components/Card'
import {Navbar} from './components/Navbar/navbar'
import "./styles/main.css"

let array = ["Prédio 1", "Prédio 2", "Prédio 3", "Prédio 4", "Prédio 5"]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar Prédio={array}/>
    <Card />
  </React.StrictMode>
)