import styles from './Navbar.module.css';
import { Filter } from './Filter';
import { useEffect, useState } from 'react';

export function Navbar({ buildings }) {
    const [buildingsFilters, setBuildingsFilters] = useState([]);

    //useEffect(() => {
    //    const defaultFilter = 'Todos';

    //    setBuildingsFilters([defaultFilter, ...buildings]);
    //});
    return (
        <div className={styles.navbar}>
            <div className={styles.divButton}>
                {buildings.map((elem) => {
                    return <button className={styles.button}>{elem}</button>;
                })}
            </div>
            <div>
                <Filter></Filter>
            </div>
        </div>
    );
}
