import styles from './Navbar.module.css';
import { Filter } from './Filter';
import { useEffect, useState } from 'react';

export function Navbar({ buildings }) {
    const [buildingsFilters, setBuildingsFilters] = useState([]);

    useEffect(() => {
        const defaultFilter = 'Todos';

        let filters = [defaultFilter, ...buildings];

        setBuildingsFilters(filters);
    });

    return (
        <div className={styles.navbar}>
            <div className={styles.divButton}>
                {buildingsFilters.map((elem) => {
                    if (elem === 'Todos') {
                        return (
                            <button
                                className={[styles.button, 'active']}
                                active
                            >
                                {elem}
                            </button>
                        );
                    }
                    return <button className={styles.button}>{elem}</button>;
                })}
            </div>
            <div>
                <Filter></Filter>
            </div>
        </div>
    );
}
