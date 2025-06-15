import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { toast, Toaster } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
});

export default function LoginForm() {
    const dispatch = useDispatch();

    const handleSubmit = async (values, actions) => {
        try {
            await dispatch(login(values)).unwrap();
            toast.success('Logged in successfully');
            actions.resetForm();
        } catch (error) {
            toast.error(error?.message || 'Invalid email or password');
        }
    };

    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className={styles.form}>
                    <label className={styles.label}>
                        Email
                        <Field
                            type="email"
                            name="email"
                            className={styles.input}
                        />
                        <ErrorMessage name="email" component="div" className={styles.error} />
                    </label>

                    <label className={styles.label}>
                        Password
                        <Field
                            type="password"
                            name="password"
                            className={styles.input}
                        />
                        <ErrorMessage name="password" component="div" className={styles.error} />
                    </label>

                    <button type="submit" className={styles.button}>Log In</button>
                </Form>
            </Formik>

            <Toaster position="top-right" />
        </>
    );
}
