import styles from './Dash.module.css';
import HelpIcon from '../assets/icon.svg';
import Avatar from '../assets/avatar.svg';

export function Dash() {
    function ChangeTheme() {
        const $html = document.querySelector('html');
        $html.classList.toggle('dark-mode');
    }
    return (
        <div className={styles.display}>
            <h1 className={styles.text}>Dashboard</h1>
            <div className={styles.help}>
                <button
                    className={styles.buttonTheme}
                    onClick={() => {
                        ChangeTheme();
                    }}
                >
                    Tema
                </button>
                <img src={HelpIcon} alt="Help Icon" />
            </div>
        </div>
    );
}
