import { useState } from 'react';
import styles from './Card.module.css';

export function Card() {
    const [countCards, setCount] = useState([2]);
    const [countDevices, setCountDevices] = useState([5]);
    const [nameLab, setNameLab] = useState([1]);

    return (
        <div className={styles.layoutLab}>
            {countCards.map((i) => {
                return (
                    <div className={styles.cardLab} key={`${i}`}>
                        <h1 className={styles.nameLab}>
                            {`Laboratório ${nameLab[countCards.indexOf(i)]}`}
                        </h1>
                        <div className={styles.contentCard}>
                            <h1
                                className={styles.contentLab}
                            >{`${countDevices[countCards.indexOf(i)]}`}</h1>
                            <h1 className={styles.subTitleContentLab}>
                                Quantidade de dispositivos
                            </h1>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}
