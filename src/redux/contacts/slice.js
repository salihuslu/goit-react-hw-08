import { createSlice, isAnyOf, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { selectNameFilter } from '../filters/slice';  // Bir üst dizine çıkıp filters/slice.js'yi import et
import { logout } from '../auth/operations';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(c => c.id !== action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(logout.fulfilled, () => {
                return []; // logout sonrası state’i temizle
            })
            .addMatcher(
                isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            ),
});

export const contactsReducer = contactsSlice.reducer;

// 📌 Seçiciler (selectors)
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

// 📌 Memoize edilmiş filtreli kişi listesi
export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, filter) =>
        contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        )
);
