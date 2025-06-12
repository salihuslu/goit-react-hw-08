import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Logging in with:', { email, password });
        dispatch(login({ email, password }));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
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
            <p className={styles.link}>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}


// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { login } from '../../redux/auth/operations';
// import { Link } from 'react-router-dom';
// import styles from './Login.module.css';

// export default function Login() {
//     const dispatch = useDispatch();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = e => {
//         e.preventDefault();
//         console.log('Logging in with:', { email, password });
//         dispatch(login({ email, password }));
//     };

//     return (
//         <div className={styles.container}>
//             <h1 className={styles.title}>Login</h1>
//             <form onSubmit={handleSubmit} className={styles.form}>
//                 <label className={styles.label}>
//                     Email
//                     <input
//                         type="email"
//                         className={styles.input}
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label className={styles.label}>
//                     Password
//                     <input
//                         type="password"
//                         className={styles.input}
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <button type="submit" className={styles.button}>Log In</button>
//             </form>
//             <p className={styles.link}>
//                 Don't have an account? <Link to="/register">Register</Link>
//             </p>
//         </div>
//     );
// }
