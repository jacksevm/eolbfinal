import React, { useEffect, useState } from 'react';
import './App.css'; // Make sure to create some basic styles for the cards in App.css


// Search component
function Search({ handleSearch }) {
  return (
    <div>
      <input type="text" placeholder="Search..." onChange={handleSearch} />
    </div>
  );
}

// Pagination component
function Pagination({ totalItems, itemsPerPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    
    <div className="pagination-container"> {/* Wrap pagination in a div with a class name */}
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function Table1() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change as needed
  const headings = ['LC Number','Is feasible to Cast EOLB','Reason for non feasibility to cast EOLB','IS Marking Given for EOLB','Is feaseible Cast ESLB','Reason for non feasibility to cast ESLB','Is Marking Given for ESLB','Is Foundation Casted for EOLB','Is Foundation Casted for ESLB','Is Power Hut available','Existing Power Source','Rating of Backup','Is Power Source caters EOLB','Is additional Power supply require','Is additional Power supply Provided','Capacity of Additional Supply','Whether work commenced','Date of commencement','Is work Completed and Ready for commissioning','Date of completion of work','Is the Plan Sanction obtained','Is Gate commissioned','Date of Commissioning']; // Define your headings here

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/dtks9g5i190ug') // Replace with your actual endpoint URL
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to handle search
  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  // Function to handle pagination
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter(item =>
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

   return (
    <div className="App">
      <h1>Data from EOLB Google Sheet</h1>
      <Search handleSearch={handleSearch} />
      <div className="table-container"> {/* Wrap the table with a div */}
        <div className="table-wrapper"> {/* Optionally, add a wrapper div for styling */}
          <div className="scrollable-table"> {/* Add a div for scrolling */}
            <table className="data-table">
              <thead>
                <tr>
                  {headings.map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, rowIndex) => (
                  <tr key={rowIndex}>
                    {headings.map((heading, colIndex) => (
                      <td key={colIndex}>{item[heading]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        paginate={paginate}
      />
    </div>
  );
}

export default Table1;
