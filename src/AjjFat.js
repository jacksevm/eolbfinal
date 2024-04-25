import React, { useEffect, useState } from 'react';
import './Table.css'; // Make sure to create some basic styles for the cards in App.css
import { Helmet } from 'react-helmet';

// Search component
function Search({ handleSearch }) {
  return (
    <div className="search-container">
      <input type="text" className="search-input" placeholder="Search Route Tested or Sheet Number..." onChange={handleSearch} />
    </div>
  );
}

// Pagination component
function Pagination({ totalItems, itemsPerPage, currentPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <Helmet>
        <title>AJJ FAT Testing</title>
        <meta name="description" content="Google Sheet Interface for Chennai Division" />
        {/* Add more meta tags, link tags, or other head elements as needed */}
      </Helmet>
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
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

function AjjFat() {
  const [data, setData] = useState([]);
  const [tableHeading, setTableHeading] = useState('');
  const [headings, setHeadings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change as needed
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

  useEffect(() => {
    // Fetch data from the provided JSON URL or local file
    fetch('./data/ajjfatdata.json') // Change to the correct path for your local data file
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        if (data.length > 0) {
          const sheetHeadings = Object.keys(data[0]);
          setHeadings(sheetHeadings);
          setTableHeading('Data From Local Table');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to handle search
  const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  // Function to handle sorting
  const handleSort = column => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Function to handle pagination
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter(item => 
      item['Route Tested '].toString().toLowerCase().includes(searchTerm) || 
      item['Sheet Number'].toString().toLowerCase().includes(searchTerm)
    ) // Filter based on Route Tested or Sheet Number
    .sort((a, b) => {
      if (sortColumn === 'Sheet Number') {
        // Special handling for sorting by "Sheet Number" column
        const columnA = parseInt(a['Sheet Number']);
        const columnB = parseInt(b['Sheet Number']);
        return sortOrder === 'asc' ? columnA - columnB : columnB - columnA;
      } else if (sortColumn) {
        // General sorting based on other columns
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];
        return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
      }
      return 0;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='App'>
      <h1 className="heading">{tableHeading}</h1>
      <div className="table-container">
        <Search handleSearch={handleSearch} />
        <div className="table-wrapper">
          <div className="scrollable-table">
            <table className="data-table">
              <thead>
                <tr>
                  {headings.map((heading, index) => (
                    // Exclude rendering ID column
                    heading !== 'Sno' && (
                      <th key={index} onClick={() => handleSort(heading)} className={sortColumn === heading ? `sortable ${sortOrder}` : 'sortable'}>
                        {heading}
                      </th>
                    )
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, rowIndex) => (
                  <tr key={rowIndex}>
                    {headings.map((heading, colIndex) => (
                      // Exclude rendering ID column
                      heading !== 'Sno' && (
                        <td key={colIndex}>{item[heading]}</td>
                      )
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default AjjFat;
