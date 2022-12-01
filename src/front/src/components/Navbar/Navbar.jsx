import "./Navbar.css"
import {Filter} from './Filter'

export function Navbar({Prédio}) {
  return (

    <div className="navbar">
      <div className="div-button">
      {Prédio.map((elem) => {
        return (
          <div key={elem}>
            <button>{elem}</button>
          </div>)
      })}
      </div>
      <div>
      <Filter></Filter>
      </div>
    </div>
  )
}


