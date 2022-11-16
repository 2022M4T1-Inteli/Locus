import "./app.css"

function App({Prédio}) {
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

export default App
