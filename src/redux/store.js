// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/slice';
import { contactsReducer } from './contacts/slice';
import filtersReducer from './filters/slice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// Auth için persist ayarları
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'], // sadece token saklanacak
};

// Tüm reducer'ları birleştir
const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
    filters: filtersReducer,
});

// Store oluştur
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

// Persistor export et
export const persistor = persistStore(store);
