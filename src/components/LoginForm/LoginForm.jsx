import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { logIn } from '../../redux/auth/operations';
import css from './LoginForm.module.css';

export default function LoginForm() {
    const dispatch = useDispatch();

    const handleSubmit = async (values, actions) => {
        const result = await dispatch(logIn(values));

        if (logIn.fulfilled.match(result)) {
            actions.resetForm();
        } else if (logIn.rejected.match(result)) {
            toast.error(result.payload || 'Invalid email or password');
        }
    };

    return (
        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
            <Form autoComplete="off" className={css.form}>
                <label className={css.label}>
                    Email
                    <Field type="email" name="email" className={css.input} />
                </label>
                <label className={css.label}>
                    Password
                    <Field type="password" name="password" className={css.input} />
                </label>
                <button type="submit" className={css.button}>Log In</button>
            </Form>
        </Formik>
    );
}
