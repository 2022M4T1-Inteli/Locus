import './combo_lab.css'
import {useState} from 'react'
import Toggle from './toggle'

function Combo_lab(props) {
      return  (
        <div className='layout-lab'>
          {props.qtd.cards.map((i) => {
            return (
            <div className="card-lab" key={`${i}`}>
              <h1 className='name-lab' > Laboratório 4 </h1>
              <Toggle key={i}/>
            <div className='content-card'>
              <h1 className='content-lab'> 
              4
               </h1>
              <h1 className='sub-title-content-lab'> Quantidade de dispositivos </h1>
            </div>
        </div>
  )})}
        </div>
    ) 

}


export default Combo_lab
