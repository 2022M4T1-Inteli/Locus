import "./dash.css"
import icon from "./icon.png"
import profile from "./naruto.jpg"

export function Dash(){
  return (
    <div className="display">
      <h1 className="text">Dashboard</h1>

      <div className="userBloc">
        <img className="imagem" src={icon} alt="Ajuda" />
        <div>
          <img className="profile" src={profile} alt="Profile photo" />
        </div>
        <h1 className="nome">Zeferino</h1>
      </div>
    </div>
  )
}