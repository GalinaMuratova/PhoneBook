import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IContact} from "../../types";
import axiosApi from "../../axiosApi";

interface Contact {
    id: number;
    name: string;
    number: string;
    email: string;
    photo: string;
}

interface ContactsState {
    contacts: Contact[];
    addLoading: boolean;
    getContacts: boolean;
}

const initialState: ContactsState = {
    contacts: [],
    addLoading:false,
    getContacts: false,
};

export const fetchContacts = createAsyncThunk<Contact[]> (
    'contacts/getContacts',
    async () => {
      const response = await axiosApi.get('/contacts.json');
        console.log(response.data)
        let contacts:Contact[] = [];
        if (response.data) {
            contacts = Object.keys(response.data).map((key) => {
                const newContact = response.data[key];
                newContact.id = key;
                return newContact;
            });
        }
        console.log(contacts)
        return contacts;
    }
)

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
        builder.addCase(fetchContacts.pending, (state) => {
            state.getContacts = true;
        });
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.getContacts = false;
            state.contacts = action.payload;
        });
        builder.addCase(fetchContacts.rejected, (state) => {
            state.getContacts = false;
        });
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
