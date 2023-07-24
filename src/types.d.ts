export interface IContact {
    name: string,
    number: string,
    email: string,
    photo: string,
}

export interface Contact {
    id: string;
    name: string;
    number: string;
    email: string;
    photo: string;
}

export interface UpdateContact {
    id: string;
    contact: IContact;
}

export interface ContactsState {
    contacts: Contact[];
    contact: IContact | null;
    addLoading: boolean;
    getContactsLoading: boolean;
    loadingOne: boolean;
    deleteLoading: boolean;
    updateLoading:boolean;
}