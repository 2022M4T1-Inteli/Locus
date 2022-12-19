import styles from './SideBar.module.css';
import OptionDashboard from '../assets/option1.svg';

export function SideBar() {
    return (
        <div className={styles.display}>
            <div className={styles.selected}></div>
            <div className={styles.icon}>
                <img src={OptionDashboard} alt="Dashboard Option" />
            </div>
            <p className={styles.options}>Dashboard</p>
        </div>
    );
}
