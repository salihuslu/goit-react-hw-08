import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import styles from './Contact.module.css';

export default function Contact({ contact }) {
    const dispatch = useDispatch();

    return (
        <div className={styles.contactItem}>
            <div className={styles.contactText}>
                <span className={styles.name}>{contact.name}</span>
                <span className={styles.number}>{contact.number}</span>
            </div>
            <button className={styles.deleteButton} onClick={() => dispatch(deleteContact(contact.id))}>Delete</button>

        </div >
    );
}
