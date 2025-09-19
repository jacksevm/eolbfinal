// src/App.js

import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import EOLB from './EOLB';
import NewHeader from './NewHeader';
import EolbChecklist from './EolbChecklist';
import WorkProgress from './WorkProgress';
import WorkProgressmyp from './WorkProgressmyp';
import './App.css'; // Import the CSS file
import GoogleSheetDataPage from './GoogleSheetDataPage';
import SheetData from './TableData';



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
         <Route path="/workprogressmyp" element={<WorkProgressmyp />} />
        <Route path="/eolb" element={<EOLB />} />
        <Route path="/slb" element={<EolbChecklist />} />
        <Route path="/fat" element={<GoogleSheetDataPage />} />
       
  
  
      </Routes>
     
    </div>
    
  );
}

export default App;
