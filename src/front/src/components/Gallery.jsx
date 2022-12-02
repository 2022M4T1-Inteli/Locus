import React from 'react';
import { useState } from 'react';
import style from './Gallery.module.css';
import Device from '../assets/device.svg';
import { Modal } from './Modal';

export function Gallery() {
    const [count, setCount] = useState([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    ]);

    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className={style.app}>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
            <div className={style.layout}>
                <div className={style.top}>
                    <div className={style.containerSearch}>
                        <h1 className={style.titleTop}>Dispositivos</h1>
                        <div className={style.search}>
                            <i className={style.materialIcons}>search</i>
                            <input
                                type="text"
                                placeholder="Pesquise por dispositivo"
                            />
                        </div>
                    </div>
                    <button
                        className={style.buttonModal}
                        onClick={() => {
                            setModalOpen(true);
                        }}
                    >
                        + Dispositivo
                    </button>
                </div>
                <div className={style.box}>
                    <div className={style.card}>
                        {count.map((item) => {
                            return <DeviceCard number={item} key={item} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

const DeviceCard = ({ number }) => {
    return (
        <div className={style.deviceBox}>
            <img src={Device} alt="Device image" width={48} />

            <div className={style.model}>
                <h3>ESP 32</h3>
            </div>

            <div className={style.status}>
                <h4>Active for 3 hours</h4>
                <h3 className={style.gradient}>100%</h3>
            </div>
        </div>
    );
};
