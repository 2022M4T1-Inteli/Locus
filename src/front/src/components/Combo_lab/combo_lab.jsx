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
              setCount([i])
              setCountDevices([countDevices[countCards.indexOf(i)]])
              setNameLab([nameLab[countCards.indexOf(i)]])
            }
            }>
              <h1 className='content-lab'> 
              {`${countDevices[contador]}`}
               </h1>
              <h1 className='sub-title-content-lab'> Quantidade de dispositivos </h1>
             <h1 className='auxiliar-lab'>  {
              contador = contador + 1
             }</h1>
            </div>
        </div> 
  ) 
}) 
  }
        </div>
    ) 

}


export default Combo_lab
