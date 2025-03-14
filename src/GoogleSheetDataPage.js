import React, { useEffect, useState } from 'react';

const GoogleSheetDataPage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbNntbhjHIZSDdFgXbBD5JuauDfu7kHK7CsKbQ3Il-hiTKtyInc8h0HpraGeZPp_tll8y0RGWufLcN/pub?output=csv';

  useEffect(() => {
    fetch(sheetURL)
      .then(response => response.text())
      .then(csv => {
        const rows = csv.split('\n').map(row => row.split(','));
        setData(rows);
      })
      .catch(error => console.error('Error fetching Google Sheet:', error));
  }, []);

  const filteredData = data.slice(1).filter(row =>
    row[0]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <h2 className="page-title">
        FAT DATA 
      </h2>
     <h2 className="page-title">
        (DDS BETWEEN CGL to VM)
      </h2>
      <input
        type="text"
        placeholder="Search by station name"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr className="table-header">
              {data[0] && data[0].map((header, index) => (
                <th key={index}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="table-cell">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoogleSheetDataPage;
