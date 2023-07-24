import React from 'react';
import {Route, Routes} from "react-router-dom";
import Contacts from "./container/Contacts/Contacts";
import AddContact from "./container/AddContact/AddContact";
import EditContact from "./container/EditContact/EditContact";
import './App.css';

function App() {
  return (
      <>
        <Routes>
          <Route path='/' element={(<Contacts/>)}/>
          <Route path='/add-contact' element={(<AddContact/>)}/>
          <Route path='/edit-contact/:id' element={(<EditContact/>)}/>
        </Routes>
      </>
  );
}

export default App;
