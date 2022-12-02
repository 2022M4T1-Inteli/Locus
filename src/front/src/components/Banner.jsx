import LocusIcon from '../assets/locus.svg';
import styles from './Banner.module.css';

export function Banner() {
    return (
        <div className={styles.banner}>
            <img className={styles.logo} src={LocusIcon} alt="Logotipo" />
        </div>
    );
}
