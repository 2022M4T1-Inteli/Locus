import styles from './SideBar.module.css';

export function SideBar() {
    return (
        <aside className={styles.sidebar}>
            {/* <img
                className={styles.cover}
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
            /> */}
            <footer>
                <a href="#">Dashboard</a>
            </footer>
        </aside>
    );
}
