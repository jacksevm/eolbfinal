import React from 'react';
import { Link } from 'react-router-dom';

function MenuBar() {
  return (
    <div className="menu-bar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/eolb">EOLB Status</Link></li>
        <li><Link to="/eslb">ESLB Status</Link></li>
    <li><Link to="/workprogress">DDS Work Progress</Link></li>
    
      </ul>
    </div>
  );
}

export default MenuBar;
