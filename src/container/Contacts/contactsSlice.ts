import { createSlice } from '@reduxjs/toolkit';

interface Contact {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    photo: string;
}

interface ContactsState {
    contacts: Contact[];
}

const initialState: ContactsState = {
    contacts: [],
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
    },
});

export const contactsReducer = contactsSlice.reducer;
