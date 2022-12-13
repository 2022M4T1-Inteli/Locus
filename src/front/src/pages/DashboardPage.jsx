import { Dash } from '../components/Dash';
import { Gallery } from '../components/Gallery';
import { Navbar } from '../components/Navbar';
import styles from './DashboardPage.module.css';
import { SideBar } from '../components/SideBar.jsx';

export default function DashboardPage() {


    return (
        <div className={styles.dashboardPage}>
            <SideBar />
            <div className={styles.dashboardColPage}>
                <Dash />
                <Gallery />
            </div>
        </div>
    );
}
