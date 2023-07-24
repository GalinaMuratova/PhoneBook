import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IContact} from "../../types";
import axiosApi from "../../axiosApi";

interface Contact {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    photo: string;
}

interface ContactsState {
    contacts: Contact[];
    addLoading: boolean;
}

const initialState: ContactsState = {
    contacts: [],
    addLoading:false,
};

export const addContact = createAsyncThunk<void, IContact>(
    'contacts/add',
    async (contact) => {
        await axiosApi.post('/contacts.json', contact);
    },
)

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addContact.pending, (state) => {
            state.addLoading = true;
        });
        builder.addCase(addContact.fulfilled, (state) => {
            state.addLoading = false;
        });
        builder.addCase(addContact.rejected, (state) => {
            state.addLoading = false;
        });
    }
});

export const contactsReducer = contactsSlice.reducer;
