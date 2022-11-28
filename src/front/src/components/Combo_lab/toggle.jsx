import './toggle.css'
import {useState} from 'react'

function Toggle ({key}) {

    const [stateToggle, setState] = useState(["toggle-button-lab-enable", "toggle-lab-enable"])

    function eventToggle (atualState) {
        atualState[0] == "toggle-button-lab-disabled"? setState(["toggle-button-lab-enable",
        "toggle-lab-enable"]): setState(["toggle-button-lab-disabled", "toggle-lab-disabled"])
    }

    return (
    <div className={stateToggle[1]} key={`${key}`} onClick={
        ()=> {
            eventToggle(stateToggle)
        }}>
        <div className={stateToggle[0]}>
        </div>
    </div>
    )
}

export default Toggle