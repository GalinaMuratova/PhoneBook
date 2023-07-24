import React from 'react';
import {Link} from "react-router-dom";


const Contacts: React.FC = () => {
    return (
        <>
            <h1>All posts</h1>
            <Link to='/add-contact'>Add</Link>
            <Link to='edit-contact/1520'>Edit</Link>
            <Link to='/'>Home</Link>
        </>
    );
};

export default Contacts;
