import './combo_lab.css'
import {useState} from 'react'
import Toggle from './toggle'

function Combo_lab(props) {

  var contador = 0
      return  (
        <div className='layout-lab'>
          {
          props.qtd.cards.map((i) => {
            return (
            <div className="card-lab" key={`${i}`}>
              <h1 className='name-lab' > Laboratório 4 </h1>
              <Toggle number={`${i}`} />
            <div className='content-card'> 
              <h1 className='content-lab'> 
              {`${props.qtd.devices[contador]}`}
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
