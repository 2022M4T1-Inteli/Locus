import './combo_lab.css'
import {useState} from 'react'
import Toggle from './toggle'

function Combo_lab() {

  const [countCards, setCount] = useState([2,3,4,5])
  const [countDevices, setCountDevices] = useState([5,2,6,7])
  const [nameLab, setNameLab] = useState([1,2,3,4])

  var contador = 0
      return  (
        <div className='layout-lab'>
          {
          countCards.map((i) => {
            return (
            <div className="card-lab" key={`${i}`} >
              <h1 className='name-lab' > {`Laboratório ${nameLab[contador]}`} </h1>
              <Toggle number={`${i}`} />
            <div className='content-card' onClick={ () => {
              console.log("Troca de página, vai ser um tal laboratório e mostrando todos os eps")
            }
            }> 
              <h1 className='content-lab'> 
              {`${countDevices[contador]}`}
               </h1>
              <h1 className='sub-title-content-lab'> Quantidade de dispositivos </h1>
            {contador = contador + 1}
            </div>
        </div>
  )
}) 
  }
        </div>
    ) 

}


export default Combo_lab
