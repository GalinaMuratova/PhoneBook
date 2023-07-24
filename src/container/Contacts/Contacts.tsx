import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {fetchContacts} from "./contactsSlice";
import ContactBlock from "../../components/ContactBlock/ContactBlock";


const Contacts: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.contactsReducer.contacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <>
            <h1>All posts</h1>
            <Link to='/add-contact'>Add</Link>
            <Link to='edit-contact/1520'>Edit</Link>
            <div className='container'>
                {contacts.map((el) => (
                    <ContactBlock key={el.id} name={el.name} number={el.number} email={el.email} photo={el.photo}/>
                ))}
            </div>
        </>
    );
};

export default Contacts;
