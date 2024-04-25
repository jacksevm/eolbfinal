// src/App.js

import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import EOLB from './EOLB';
import NewHeader from './NewHeader';
import EolbChecklist from './EolbChecklist';
import WorkProgress from './WorkProgress';
import WorkProgress from './Ajjfat';
import './App.css'; // Import the CSS file


function App() {
  return (
    <div className="container"> {/* Apply the container class */}
      <Helmet>
        <title>GoogleSheet Interface | Home</title>
        <meta name="description" content="Google Sheet Interface for Chennai Division" />
        {/* Add more meta tags, link tags, or other head elements as needed */}
      </Helmet>
      <NewHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workprogress" element={<WorkProgress />} />
        <Route path="/eolb" element={<EOLB />} />
        <Route path="/eolbchecklist" element={<EolbChecklist />} />
        <Route path="/ajjfat" element={<AjjFat />} />
      </Routes>
     
    </div>
    
  );
}

export default App;
