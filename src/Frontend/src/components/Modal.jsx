import React from 'react';
import styles from './Modal.module.css';

export function Modal({ setOpenModal }) {
    return (
        <div className={styles.background}>
            <div className={styles.modal}>
                <div>
                    <h1 className={styles.header}>Adicionar dispositivo: </h1>
                </div>
                <div className={styles.inputClass}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Digite código do dispositivo"
                    />
                </div>
                <div className={styles.button}>
                    <button
                        className={styles.buttonCancel}
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        className={styles.buttonAdd}
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
}
