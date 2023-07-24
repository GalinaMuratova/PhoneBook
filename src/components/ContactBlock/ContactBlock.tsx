import React, { useState } from 'react';
import './contactBlock.css';
import {Link} from "react-router-dom";

interface Props {
    name: string,
    number: string,
    email: string,
    photo: string,
    id: string
}

const ContactBlock: React.FC<Props> = ({ name, number, email, photo, id }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const click = async () => {
        handleOpenModal();
    };
    const editContact = (id: string) => {
        console.log('edit' + id);
    };

    const deleteContact = (id:string) => {
        console.log('delete' + id);
    };

    return (
        <>
            <div onClick={click} className='card card-cont d-flex flex-row my-3'>
                <div><img src={photo} alt='profile' className='profile-img' /></div>
                <div className='ms-3'>
                    <h3 className='title-cont'>{name}</h3>
                </div>
            </div>
            {isModalOpen && (
                <div className='block-modal'>
                    <div className = 'contact-modal d-flex flex-column'>
                        <div>
                            <button onClick={handleCloseModal} className='close-btn'></button>
                        </div>
                        <div className='d-flex content-contact'>
                            <div className='me-3'>
                                <img src={photo} alt='profile'  className='profile-img'/>
                            </div>
                            <div>
                                <h3>{name}</h3>
                                <p><b>Number:</b> {number}</p>
                                <span><b>Email:</b> {email}</span>
                            </div>
                        </div>
                        <div className='mt-4 d-flex justify-content-around'>
                            <button onClick={() =>editContact(id)} className='btn btn-primary'><Link to={`/edit-contact/${id}`} className='btn btn-primary'>Edit</Link></button>
                            <button onClick={() => deleteContact(id)} className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactBlock;
