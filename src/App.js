// src/App.js

import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import EOLB from './EOLB';
import NewHeader from './NewHeader';
import EolbChecklist from './EolbChecklist';
import WorkProgress from './WorkProgress';
import AjjFat from './AjjFat';
import './App.css'; // Import the CSS file
import GoogleSheetEmbed from './GoogleSheetviewer';


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
   <Route path="/GoogleSheetviewer" element={<GoogleSheetviewer />} />
      </Routes>
     
    </div>
    
  );
}

export default App;
