import { useState } from 'react';
import styles from './Toggle.module.css';

export function Toggle({ number }) {
    const [stateToggle, setState] = useState([
        styles.toggleButtonLabEnable,
        toggleLabEnable,
    ]);

    function eventToggle(atualState) {
        atualState[0] == styles.toggleButtonLabDisabled
            ? setState([styles.toggleButtonLabEnable, styles.toggleLabEnable])
            : setState([
                  styles.toggleButtonLabDisabled,
                  styles.toggleLabDisabled,
              ]);
    }

    return (
        <div
            className={stateToggle[1]}
            key={`${number}`}
            onClick={() => {
                eventToggle(stateToggle);
            }}
        >
            <div className={stateToggle[0]}></div>
        </div>
    );
}
