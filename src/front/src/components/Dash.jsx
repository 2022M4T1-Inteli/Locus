import styles from './Dash.module.css';
import HelpIcon from '../assets/icon.svg';
import Avatar from '../assets/avatar.svg';

export function Dash() {
    return (
        <div className={styles.display}>
            <h1 className={styles.text}>Dashboard</h1>
            <div className={styles.help}>
                <img src={HelpIcon} alt="Help Icon" />
            </div>
        </div>
    );
}
