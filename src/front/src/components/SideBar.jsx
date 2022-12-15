import styles from './SideBar.module.css';

export function SideBar() {
    return (
        <aside className={styles.sidebar}>
            <footer>
                <a href="#">Geral</a>
                <a href="#">Prédio 01</a>
                <a href="#">Prédio 02</a>
                <a href="#">Prédio 03</a>
                <a href="#">Prédio 04</a>
                <a href="#">Prédio 05</a>
                <a href="#">Prédio 03</a>
            </footer>
        </aside>
    );
}
