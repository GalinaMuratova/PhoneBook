import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Contact, ContactsState, IContact, UpdateContact} from "../../types";
import axiosApi from "../../axiosApi";

const initialState: ContactsState = {
    contacts: [],
    contact: null,
    addLoading:false,
    getContactsLoading: false,
    loadingOne:false,
    deleteLoading:false,
    updateLoading:false
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

export const fetchContact = createAsyncThunk<IContact, string>(
    'contacts/getContact',
    async (id) => {
        const response = await axiosApi.get<IContact>(`/contacts/${id}.json`);
        return {
            ...response.data
        };
    },
);

export const addContact = createAsyncThunk<void, IContact>(
    'contacts/add',
    async (contact) => {
        await axiosApi.post('/contacts.json', contact);
    },
);

export const updateContact = createAsyncThunk<void, UpdateContact> (
    '',
    async (element) => {
        await axiosApi.put(`/contacts/${element.id}.json`, element.contact);
    }
)

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
        builder.addCase(fetchContact.pending, (state) => {
            state.loadingOne = true;
        });
        builder.addCase(fetchContact.fulfilled, (state, action) => {
            state.loadingOne = false;
            state.contact = action.payload;
        });
        builder.addCase(fetchContact.rejected,  (state) => {
            state.loadingOne = false;
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
        builder.addCase(updateContact.pending, (state) => {
            state.updateLoading = true;
        });
        builder.addCase(updateContact.fulfilled, (state) => {
            state.updateLoading = false;
        });
        builder.addCase(updateContact.rejected, (state) => {
            state.updateLoading = false;
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
