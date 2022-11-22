import "./navbar.css"

export function Navbar({Prédio}) {
  return (

    <div className="navbar">
      {Prédio.map((elem) => {
        return (
          <div key={elem}>
            <button>{elem}</button>
          </div>)
      })}
    </div>
  )
}


