import React from "react";
import "./Modal.css";


export function Modal({ setOpenModal }) {
  return (    
    <div className="background">
      <div className="modal">
        <div>
          <h1 className="header">Adicionar dispositivo: </h1>
        </div>
        <div className="input-class">
          <input
            className="input"
            type="text"
            placeholder="Digite código do dispositivo"
          />
        </div>
        <div className="button">
          <button className="button-cancel" onClick={() => {
              setOpenModal(false);}} 
              >Cancelar</button>
          <button className="button-add" onClick={() => {
              setOpenModal(false);}}
              >Adicionar</button>
        </div>
      </div>
    </div>
  );
}