import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { toast, Toaster } from 'react-hot-toast';
import styles from './LoginForm.module.css';

export default function LoginForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await dispatch(login({ email, password })).unwrap();
            toast.success('Logged in successfully');
        } catch (error) {
            toast.error(error?.message || 'Invalid email or password');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    Email
                    <input
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className={styles.label}>
                    Password
                    <input
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className={styles.button}>Log In</button>
            </form>
            <Toaster position="top-right" />
        </>
    );
}
