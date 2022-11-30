import "./Navbar.css"
import {Filter} from './Filter'

export function Navbar({Prédio}) {
  return (

    <div className="navbar">
      {Prédio.map((elem) => {
        return (
          <div key={elem}>
            <button>{elem}</button>
          </div>)
      })}
      <Filter></Filter>
    </div>
  )
}


