import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';

import styles from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too Long')
        .required('Required'),
    number: Yup.string()
        .min(3, 'Too Short')
        .max(50, 'Too Long')
        .required('Required'),
});

export default function ContactForm() {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        dispatch(addContact(values));
        resetForm();
    };

    return (
        <Formik
            initialValues={{ name: '', number: '' }}
            validationSchema={ContactSchema}
            onSubmit={handleSubmit}
        >
            <Form className={styles.form}>
                <label className={styles.label}>
                    Name
                    <Field type="text" name="name" className={styles.input} />
                    <ErrorMessage name="name" component="div" className={styles.error} />
                </label>
                <label className={styles.label}>
                    Number
                    <Field type="number" name="number" className={styles.input} />
                    <ErrorMessage name="number" component="div" className={styles.error} />
                </label>
                <button type="submit" className={styles.button}>
                    Add contact
                </button>
            </Form>
        </Formik>
    );
}
