import { NavLink } from 'react-router-dom';
import styles from './AuthNav.module.css';

export default function AuthNav() {
    return (
        <div className={styles.nav}>
            <NavLink to="/register" className={styles.link}>
                Register
            </NavLink>
            <NavLink to="/login" className={styles.link}>
                Login
            </NavLink>
        </div>
    );
}
