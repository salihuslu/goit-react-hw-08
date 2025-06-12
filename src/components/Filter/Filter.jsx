import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';
import filtersSelectors from '../../redux/filters/selectors.js';

import styles from './Filter.module.css';

const selectFilter = filtersSelectors.selectFilter;


export default function Filter() {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);

    const handleChange = e => {
        dispatch(changeFilter(e.target.value));
    };

    return (
        <label className={styles.label}>
            Find contacts by name
            <input
                type="text"
                value={filter}
                onChange={handleChange}
                className={styles.input}
                placeholder="Search..."
            />
        </label>
    );
}
