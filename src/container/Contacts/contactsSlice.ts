import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IContact} from "../../types";
import axiosApi from "../../axiosApi";

interface Contact {
    id: string;
    name: string;
    number: string;
    email: string;
    photo: string;
}

interface ContactsState {
    contacts: Contact[];
    contact: Contact | null;
    addLoading: boolean;
    getContactsLoading: boolean;
    loadingOne: boolean;
    deleteLoading: boolean;
}

const initialState: ContactsState = {
    contacts: [],
    contact: null,
    addLoading:false,
    getContactsLoading: false,
    loadingOne:false,
    deleteLoading:false
};

export const fetchContacts = createAsyncThunk<Contact[]> (
    'contacts/getContacts',
    async () => {
      const response = await axiosApi.get('/contacts.json');
        let contacts:Contact[] = [];
        if (response.data) {
            contacts = Object.keys(response.data).map((key) => {
                const newContact = response.data[key];
                newContact.id = key;
                return newContact;
            });
        }
        return contacts;
    },
);

export const addContact = createAsyncThunk<void, IContact>(
    'contacts/add',
    async (contact) => {
        await axiosApi.post('/contacts.json', contact);
    },
);

export const deleteContact = createAsyncThunk<void, string>(
    'contacts/delete',
    async (id: string) => {
        await axiosApi.delete(`contacts/${id}.json`);
    }
)

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContacts.pending, (state) => {
            state.getContactsLoading = true;
        });
        builder.addCase(fetchContacts.fulfilled, (state, action) => {
            state.getContactsLoading = false;
            state.contacts = action.payload;
        });
        builder.addCase(fetchContacts.rejected, (state) => {
            state.getContactsLoading = false;
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
        builder.addCase(deleteContact.pending, (state) => {
            state.deleteLoading = true;
        });
        builder.addCase(deleteContact.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteContact.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const contactsReducer = contactsSlice.reducer;
