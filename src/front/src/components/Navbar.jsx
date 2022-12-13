import styles from './Navbar.module.css';
import { Filter } from './Filter';
import { useEffect, useState } from 'react';

export function Navbar({ buildings }) {
    return (
        <div className={styles.navbar}>
            <div className={styles.divButton}>
                {buildingsFilters.map((elem) => {
                    return (
                        <button
                            id={elem}
                            onClick={() => activation(elem)}
                            className={styles.button}
                        >
                            {elem}
                        </button>
                    );
                })}
            </div>
            <div>
                <Filter></Filter>
            </div>
        </div>
    );
}
