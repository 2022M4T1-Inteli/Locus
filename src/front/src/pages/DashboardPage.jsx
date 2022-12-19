import { Dash } from '../components/Dash';
import { Gallery } from '../components/Gallery';
import { Navbar } from '../components/Navbar';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
    return (
        <div className={styles.dashboardPage}>
            <Dash />
            <div className={styles.dashboardColPage}>
                <Navbar buildings={['Prédio 1', 'Prédio 2', 'Prédio 3']} />
                <Gallery />
            </div>
        </div>
    );
}
