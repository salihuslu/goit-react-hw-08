import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../redux/auth/operations';
import { Link, useNavigate } from 'react-router-dom';
import css from './RegistrationForm.module.css';
import { toast } from 'react-hot-toast';

const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short').max(50, 'Too long').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
});

export default function RegistrationForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values, actions) => {
        try {
            await dispatch(register(values)).unwrap();
            toast.success('Registration successful! You can log in.');
            actions.resetForm();
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error('Registration failed! Try again.');
        }
    };

    return (
        <div className={css.container}>
            <h1 className={css.title}>Register</h1>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className={css.form} autoComplete="off">
                    <label className={css.label}>
                        Name
                        <Field type="text" name="name" className={css.input} />
                        <ErrorMessage name="name" component="div" className={css.error} />
                    </label>
                    <label className={css.label}>
                        Email
                        <Field type="email" name="email" className={css.input} />
                        <ErrorMessage name="email" component="div" className={css.error} />
                    </label>
                    <label className={css.label}>
                        Password
                        <Field type="password" name="password" className={css.input} />
                        <ErrorMessage name="password" component="div" className={css.error} />
                    </label>
                    <button type="submit" className={css.button}>Register</button>
                </Form>
            </Formik>
            <p className={css.link}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
