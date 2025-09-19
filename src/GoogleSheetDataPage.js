import React, { useEffect, useState } from 'react';

const GoogleSheetDataPage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const sheetURL = 'https://docs.google.com/spreadsheets/d/1wokjqFAE8TGuh-qEDjXMslnYXm5u2TCpOKKSwwFZyxw/edit?gid=581323794#gid=581323794';

  useEffect(() => {
    fetch(sheetURL)
      .then(response => response.text())
      .then(csv => {
        const rows = csv.split('\n').map(row => row.split(','));
        console.log('Fetched data:', rows); // Debugging line
        setData(rows);
      })
      .catch(error => console.error('Error fetching Google Sheet:', error));
  }, []);

  console.log('Full data:', data); // Debugging line

  const filteredData = data.slice(1).filter(row =>
    row[1]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log('Filtered data:', filteredData); // Debugging line

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="page-container">
      <h2 className="page-title">
        FAT DATA 
      </h2>
     <h2 className="page-title">
       (DDS BETWEEN CGL to VM)
      </h2>

      <div className="table-container">
      <input
        type="text"
        placeholder="Search by station name"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <div className="button-container">
        <button className="google-sheets-button" onClick={() => window.open("https://docs.google.com/spreadsheets/d/1Uoyrx4z1Uzy9nPtLtiVmXRG5vMOfy9YJL-0GThg-0p0/edit?gid=0#gid=0", '_blank')}>
          Open Google Sheet
        </button>
      </div>
      <table className="data-table">
        <thead>
          <tr className="table-header">
            <th>Sl.No</th>
            {data[0] && data[0].map((header, index) => (
              <th key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="table-row">
                <td className="table-cell">{(currentPage - 1) * itemsPerPage + rowIndex + 1}</td>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="table-cell">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={data[0]?.length + 1 || 2} className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>
  );
};

export default GoogleSheetDataPage;
