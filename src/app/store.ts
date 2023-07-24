import { configureStore } from '@reduxjs/toolkit';
import {contactsReducer} from "../container/Contacts/contactsSlice";

export const store = configureStore({
    reducer: {
        contactsReducer: contactsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;