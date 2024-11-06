import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Helmet } from 'react-helmet';
import Footer from './Footer';


function Home() {
  return (
    <div className="App">
      <div className="home">
        <Helmet>
          <title>GoogleSheet Interface | Home</title>
          <meta
            name="description"
            content="Google Sheet Interface for Chennai Division"
          />
        </Helmet>

        <div className="card">
          <Link to="/eolb">
            <img
              src={process.env.PUBLIC_URL + '/img/eolb.jpg'}
              alt="EOLB Status"
            />
            <div className="card-info">
              <h3>EOLB Status</h3>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link to="/eolbchecklist">
            <img
              src={process.env.PUBLIC_URL + '/img/eolbchecklist.png'}
              alt="EOLB Pre Commissioning Check Lists"
            />
            <div className="card-info">
              <h3>EOLB Check Lists</h3>
            </div>
          </Link>
        </div>
{/* Displaying an image */}
        <div className="image-container">
          <img
            src={process.env.PUBLIC_URL + '/img/eolbchecklist.png'} // Make sure the image is in the public/img folder
            alt="Home Image"
            className="home-image" // You can use this class for styling
          />
        </div>
 
        {/* Uncomment if needed in future */}
        {/* <div className="card">
          <Link to="https://public.tableau.com/app/profile/jackson.pereira/viz/FailureAnalysis-MASDivision/Dashboard2">
            <img
              src={process.env.PUBLIC_URL + '/img/fattesting.png'}
              alt="AJJ FAT Testing"
            />
            <div className="card-info">
              <h3>Failure Analysis</h3>
            </div>
          </Link>
        </div> */}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
