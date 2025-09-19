import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import './Table.css';

function SheetData() {
  const [data, setData] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const webAppUrl = "https://script.google.com/macros/s/AKfycbw1mwg7DdnN8E28z-5pan9xXA0ebU0v20wXfl4HTq8/dev";

    fetch(webAppUrl)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        setData(data);
        if (data.length > 0) {
          setHeadings(Object.keys(data[0]));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Helmet>
        <title>Google Sheet Data</title>
        <meta
          name="description"
          content="All rows from DOUBLE DISTANT tab"
        />
      </Helmet>

      <div className="container">
        <h1 className="heading">All Data (DOUBLE DISTANT)</h1>

        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && data.length === 0 && (
          <p>No rows found in the sheet.</p>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="table-wrapper">
            <div className="scrollable-table">
              <table className="data-table">
                <thead>
                  <tr>
                    {headings.map((heading, index) => (
                      <th key={index}>{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {headings.map((heading, colIndex) => (
                        <td key={colIndex}>{row[heading]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default SheetData;
