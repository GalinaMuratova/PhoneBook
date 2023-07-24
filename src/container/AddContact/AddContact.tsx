import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {IContact} from "../../types";
import './addContact.css';
import {addContact} from "../Contacts/contactsSlice";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const contactInfo = {
    name: '',
    number: '',
    email: '',
    photo: 'https://i1.sndcdn.com/artworks-hAiTfsOSiHL4nIM1-LHNs3Q-t500x500.jpg',
};

const AddContact: React.FC = () => {
    const [contact, setContact] = useState<IContact>(contactInfo);
    const dispatch: AppDispatch = useDispatch();
    const loading = useSelector((state:RootState) => state.contactsReducer.addLoading);
    const navigate = useNavigate();

    const onFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        await dispatch(addContact(contact));
        setContact(prevState => ({
            ...prevState,
            name: '',
            number: '',
            email: '',
            photo: 'https://i1.sndcdn.com/artworks-hAiTfsOSiHL4nIM1-LHNs3Q-t500x500.jpg',
        }));
        navigate('/');
    };

    const contactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setContact(prevState => ({
            ...prevState,
            [name]: value,
        }));
        console.log(name + ':' + value);
    };

    let btn = (
        <button type='submit' className='btn btn-primary'>Add contact</button>
    );

    if (loading) {
        btn = <Spinner/>;
    }

    return (
        <div className='container text-center'>
            <h1>Add New Contact</h1>
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
                    <img src={contact.photo} alt='contact'/>
                </div>
                {btn}
            </form>
        </div>
    );
};

export default AddContact;
