import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import styles from './UserMenu.module.css';

export default function UserMenu() {
    const dispatch = useDispatch();
    const { name } = useSelector(selectUser);

    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>Welcome, {name}!</p>
            <button className={styles.button} onClick={() => dispatch(logout())}>
                Logout
            </button>
        </div>
    );
}
