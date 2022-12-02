import styles from './Dash.module.css';
import HelpIcon from '../assets/icon.svg';
import Avatar from '../assets/avatar.svg';

export function Dash() {
    return (
        <div className={styles.display}>
            <h1 className={styles.text}>Dashboard</h1>

            <div className={styles.userBlock}>
                <img src={HelpIcon} alt="Help Icon" />
                <div>
                    <img src={Avatar} alt="Avatar" />
                </div>
                <h1 className={styles.nome}></h1>
            </div>
        </div>
    );
}
