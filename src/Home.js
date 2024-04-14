// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

function Home() {
  return (
    
      
      <div className="home">
        <div className="card">
          <Link to="/eolb">
            <img src={process.env.PUBLIC_URL + '/img/eolb.jpg'} alt="EOLB Status" />
            <div className="card-info">
              <h2>EOLB Status</h2>
              <p>Click here to view the EOLB status.</p>
            </div>
          </Link>
        </div>
        <div className="card">
          <Link to="/eolbchecklist">
            <img src={process.env.PUBLIC_URL + '/img/eolbchecklist.png'} alt="EOLB Pre Commissioning Check Lists" />
            <div className="card-info">
              <h2>EOLB Check Lists</h2>
              <p>Click here to view the EOLB Pre Commissioning Check Lists.</p>
            </div>
          </Link>
        </div>
      </div>
   
  );
}

export default Home;
