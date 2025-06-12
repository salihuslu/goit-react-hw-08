import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/slice';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

export default function ContactList() {
    const contacts = useSelector(selectFilteredContacts);

    return (
        <ul className={styles.list}>
            {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
            ))}
        </ul>
    );
}
