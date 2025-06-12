import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '../../components/ContactForm/ContactForm';
import Filter from '../../components/Filter/Filter';
import ContactList from '../../components/ContactList/ContactList';

import { fetchContacts } from '../../redux/contacts/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import styles from './Contacts.module.css';


export default function Contacts() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchContacts());
        }
    }, [dispatch, isLoggedIn]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Contacts</h2>
            <ContactForm />
            <Filter />
            <ContactList />
        </div>
    );
}
