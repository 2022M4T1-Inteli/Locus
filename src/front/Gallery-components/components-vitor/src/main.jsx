import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

let array = ["Prédio 1", "Prédio 2", "Prédio 3", "Prédio 4", "Prédio 5"]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App Prédio={array}/>
  </React.StrictMode>
)
