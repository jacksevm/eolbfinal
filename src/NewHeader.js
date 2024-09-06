import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewHeader.css'; // Import CSS file for styling

const NewHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <h3>Google sheet Interface</h3>
      <nav className="nav">
      <div className="menu-title">Menu</div>
        <button className="hamburger-btn" onClick={toggleMenu} title="Menu">
          <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}></div>
        </button>
        {isMenuOpen && (
          <ul className="menu-items">
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/workprogress" onClick={toggleMenu}>Work Progress</Link></li>
            <li><Link to="/eolb" onClick={toggleMenu}>EOLB</Link></li>
            <li><Link to="/eolbchecklist" onClick={toggleMenu}>EOLB Pre-com Check lists</Link></li>
         <li><Link to="https://public.tableau.com/app/profile/jackson.pereira/viz/FailureAnalysis-MASDivision/Dashboard2" onClick={toggleMenu}>Failure Analysis</Link></li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default NewHeader;
