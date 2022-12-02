import './Card.css';
import { useState } from 'react';
import Toggle from './Toggle';
import styles from './Card.module.css';

export function Card() {
    const [countCards, setCount] = useState([2, 3, 4, 5]);
    const [countDevices, setCountDevices] = useState([5, 2, 6, 7]);
    const [nameLab, setNameLab] = useState([1, 2, 3, 4]);

    var contador = 0;
    return (
        <div className={styles.layoutLab}>
            {countCards.map((i) => {
                return (
                    <div className={styles.cardLab} key={`${i}`}>
                        <h1 className={styles.nameLab}>
                            {' '}
                            {`Laboratório ${nameLab[contador]}`}{' '}
                        </h1>
                        <Toggle number={`${i}`} />
                        <div className={styles.contentCard}>
                            <h1
                                className={styles.contentLab}
                            >{`${countDevices[contador]}`}</h1>
                            <h1 className={styles.subTitleContentLab}>
                                {' '}
                                Quantidade de dispositivos{' '}
                            </h1>
                            {(contador = contador + 1)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
