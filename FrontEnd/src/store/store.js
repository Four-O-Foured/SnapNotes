import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import snapNotesReducer from './slices/snapNotesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        snapNotes: snapNotesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
