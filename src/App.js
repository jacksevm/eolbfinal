// src/App.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import EOLB from './EOLB';
import NewHeader from './NewHeader';
import EolbChecklist from './EolbChecklist';






function App() {
 
 
  return (
    <div className="App">
      <Helmet>
         <title>Google sheet Interface</title>
        <meta name="description" content="Google Sheet Interface for Chennai Division" />
        {/* Add more meta tags, link tags, or other head elements as needed */}
      </Helmet>
     <NewHeader />
     <Routes>
     <Route path="/" element={<Home /> } />
     <Route path="/eolb" element={<EOLB /> } />
     <Route path="/eolbchecklist" element={<EolbChecklist /> } />
     
     </Routes>
      
      
    </div>
  );
}

export default App;
