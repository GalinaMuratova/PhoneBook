import React from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Contacts from "./container/Contacts/Contacts";
import AddContact from "./container/AddContact/AddContact";
import EditContact from "./container/EditContact/EditContact";


function App() {
  return (
      <>
        <Routes>
          <Route path='/' element={(<Contacts/>)}/>
          <Route path='/add-contact' element={(<AddContact/>)}/>
          <Route path='/edit-contact/:id' element={(<EditContact/>)}/>
        </Routes>

        <Link to='/add-contact'>Add</Link>
        <Link to='edit-contact/1520'>Edit</Link>
        <Link to='/'>Home</Link>
      </>
  );
}

export default App;
