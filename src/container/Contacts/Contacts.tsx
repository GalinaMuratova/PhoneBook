import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchContacts} from "./contactsSlice";
import ContactBlock from "../../components/ContactBlock/ContactBlock";
import Spinner from "../../components/Spinner/Spinner";


const Contacts: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.contactsReducer.contacts);
    const loadingContacts = useSelector((state: RootState) => state.contactsReducer.getContactsLoading);


    let contactsBlock = (
        <div className='container'>
            {contacts.map((el) => (
                <ContactBlock key={el.id} name={el.name} number={el.number} email={el.email} photo={el.photo} id={el.id}/>
            ))}
        </div>
    );

    if (loadingContacts) {
        contactsBlock = <Spinner />
    }

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <>
            <div className='d-flex justify-content-evenly mt-3'>
                <h1>All contacts</h1>
                <div><Link to='/add-contact' className='btn btn-primary'>Add contact</Link></div>
            </div>
            {contactsBlock}
        </>
    );
};

export default Contacts;
