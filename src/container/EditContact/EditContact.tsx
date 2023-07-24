import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {fetchContact, updateContact} from '../Contacts/contactsSlice';
import { IContact } from '../../types';
import Spinner from "../../components/Spinner/Spinner";

const EditContact = () => {
    const [contact, setContact] = useState<IContact | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const contactOne = useSelector((state: RootState) => state.contactsReducer.contact);
    const editLoading = useSelector((state: RootState) => state.contactsReducer.updateLoading);

    useEffect(() => {
        dispatch(fetchContact(id!));
    }, [dispatch, id]);

    useEffect(() => {
        setContact(contactOne);
    }, [contactOne]);

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id && contact) {
            await dispatch(updateContact({ id, contact }));
            navigate('/');
        }
    };
    const contactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setContact((prevState) => ({
            ...prevState!,
            [name]: value,
        }));
    };

    if (!contact) {
        return <div>Loading...</div>;
    }

    let btn = (
        <>
            <button type='submit' className='btn btn-primary mx-2'>
                Edit
            </button>
            <Link to='/' className='btn btn-secondary'>
                Home
            </Link>
        </>
    );

    if (editLoading) {
        btn = <Spinner/>
    }

    return (
        <div className='container text-center'>
            <h1>Edit contact</h1>
            <form onSubmit={onFormSubmit} className='form-contact'>
                <input
                    type='text'
                    name='name'
                    id='name'
                    className='form-control my-3'
                    value={contact.name}
                    onChange={contactChange}
                    placeholder='Enter name'
                    required
                />
                <input
                    type='text'
                    name='number'
                    id='number'
                    className='form-control my-3'
                    value={contact.number}
                    onChange={contactChange}
                    placeholder='Enter phone number'
                    required
                />
                <input
                    type='email'
                    name='email'
                    id='email'
                    className='form-control my-3'
                    value={contact.email}
                    onChange={contactChange}
                    placeholder='Enter email'
                />
                <input
                    type='text'
                    name='photo'
                    id='photo'
                    className='form-control my-3'
                    value={contact.photo}
                    onChange={contactChange}
                    placeholder='Enter photo link'
                />
                <div className='img-add my-2 mx-auto'>
                    <img src={contact.photo} alt='contact' />
                </div>
                {btn}
            </form>
        </div>
    );
};

export default EditContact;
