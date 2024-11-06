import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import HtmlViewer from './HtmlViewer'; // Ensure this is designed to handle PDFs

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

        {/* Display PDF using HtmlViewer */}
        <div className="html-container">
          <HtmlViewer src={process.env.PUBLIC_URL + 'simple gantt chart.html'} />
        </div>

        {/* Display HTML file using iframe */}
        <iframe
          src={process.env.PUBLIC_URL + '/data/simple gantt chart.html'}
          title="HTML Viewer"
          width="100%"
          height="600px"
          style={{ border: 'none' }}
        />

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
