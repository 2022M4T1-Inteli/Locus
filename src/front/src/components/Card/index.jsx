import React from "react";
import { useState } from "react";
import "./styles.css";
import Monitor from "../../assets/Monitor";
import { Modal } from "../Modal/Modal";

export function Card() {
  const [count, setCount] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
  ]);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <div className="Layout">
        <div className="Top">
          <h1>Dispositivos</h1>
          <div className="Search">
            <i className="material-icons">search</i>
            <input type="text" placeholder="Pesquise por dispositivo" />
          </div>
          <button
            className="button-modal"
            onClick={() => {
              setModalOpen(true);}}>
            + Dispositivo
          </button>

          {modalOpen && <Modal setOpenModal={setModalOpen} />}
        </div>
        <div className="Card">
          {count.map((item) => {
            return <DeviceCard number={item} key={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

const DeviceCard = ({ number }) => {
  return (
    <div
      className= "DeviceBox"
    >
      <Monitor width={48} />

      <div className="Model">
        <h3>ESP 32</h3>
      </div>

      <div className="Status">
        <h4>Active for 3 hours</h4>
        <h3
        className= "grad"
        >
          100%
        </h3>
      </div>

    </div>
  );
};
