import React from 'react';
import './contactBlock.css'

interface Props {
    name: string,
    number: string,
    email: string,
    photo: string,
}

const ContactBlock: React.FC<Props> = ({name, number,email, photo}) => {
    return (
        <div className='card card-cont d-flex flex-row my-3'>
            <div><img src={photo} alt='profile' className='profile-img'/></div>
            <div className='ms-3'>
                <h4 className='title-cont'>{name}</h4>
                <p className='number-cont'>{number}</p>
                <span className='email-cont'>{email}</span>
            </div>
        </div>
    );
};

export default ContactBlock;