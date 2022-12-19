import styles from './LocusButton.module.css';
import classNames from 'classnames';

export function LocusButton({ children, className, ...props }) {
    let cx = classNames(styles.button, className);

    return (
        <button className={cx} {...props}>
            {children}
        </button>
    );
}
