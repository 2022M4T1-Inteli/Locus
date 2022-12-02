import styles from './Filter.module.css';

export function Filter() {
    return (
        <div className={styles.layout}>
            <select className={styles.select} name="Filtrar por: ">
                <option className={styles.option} value="laboratorios">
                    Laboratórios
                </option>
                <option className={styles.option} value="equipamentos">
                    Equipamentos A - Z
                </option>
            </select>
        </div>
    );
}
