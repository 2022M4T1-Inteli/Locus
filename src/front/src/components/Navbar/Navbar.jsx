import "./navbar.css"

export function navbar({Prédio}) {
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


