import styles from './Navbar.module.css';
import { Filter } from './Filter';
import { useEffect, useState } from 'react';

export function Navbar({ buildings }) {
    const [buildingsFilters, setBuildingsFilters] = useState([]);
    const [buttonActive, setButtonActive] = useState("Todos");

    //useEffect(() => {
    //    const defaultFilter = 'Todos';

<<<<<<< HEAD
    //    setBuildingsFilters([defaultFilter, ...buildings]);
    //});
    return (
        <div className={styles.navbar}>
            <div className={styles.divButton}>
                {buildings.map((elem) => {
                    return <button className={styles.button}>{elem}</button>;
=======
        setBuildingsFilters([defaultFilter, ...buildings]);
    }, []);

    function activation(e) {
        buildingsFilters.map((building) => {
            document.getElementById(building).style.background = 'transparent'
            document.getElementById(building).style.color = "#7a7a7a";
        })
        document.getElementById(e).style.background = "linear-gradient(to right, " + "#edbaff" + ", " + "#a1ffff " + ")"
        document.getElementById(e).style.color = "black";
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.divButton}>
                {buildingsFilters.map((elem) => {
                    return <button id={elem} onClick={() => activation(elem)} className={styles.button}>{elem}</button>;
>>>>>>> ee8a3adb389867c9bfc91007eec30723c5d8f3c7
                })}
            </div>
            <div>
                <Filter></Filter>
            </div>
        </div>
    );
}