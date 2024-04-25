import React, { useEffect, useState } from 'react';
import './Table.css'; // Make sure to create some basic styles for the cards in App.css
import { Helmet } from 'react-helmet';
import Footer from './Footer';

// Search component
function Search({ handleSearch }) {
  return (
    <div className="search-container">
      <input type="text" className="search-input" placeholder="Search Route Number or Sheet Number..." onChange={handleSearch} />
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
        <title>AJJ FAT TESTING DATA</title>
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
    // Fetch data
    fetch(''./data/ajjfatdata.json') // Replace with your actual endpoint URL
      .then(response => response.json())
      .then(data => {
        setData(data);
        if (data.length > 0) {
          const sheetHeadings = Object.keys(data[0]);
          setHeadings(sheetHeadings.filter(heading => heading !== 'Id')); // Exclude 'Id' column
          setTableHeading('Data From Google Sheet');
          // If initial sorting is required, set the initial sortColumn and sortOrder here
          // setSortColumn('columnName');
          // setSortOrder('asc');
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
    .filter(item => item['Route Tested'].toString().includes(searchTerm) || item['Sheet Number'].toString().includes(searchTerm)) // Filter based on Route Tested or Sheet Number
    .sort((a, b) => {
      if (sortColumn !== null) {
        const columnA = String(a[sortColumn]).toLowerCase(); // Convert to lowercase
        const columnB = String(b[sortColumn]).toLowerCase(); // Convert to lowercase
        return sortOrder === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
      }
      return 0; // If sortColumn is null, return 0 to maintain the current order
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='App'>
      <div className='container'>
        <h1 className="heading">{tableHeading}</h1>
        
        <div className="table-container">
          <Search handleSearch={handleSearch} />
         
          <div className="table-wrapper">
            <div className="scrollable-table">
              <table className="data-table">
                <thead>
                  <tr>
                    {headings.map((heading, index) => (
                      <th key={index} onClick={() => handleSort(heading)} className={sortColumn === heading ? `sortable ${sortOrder}` : 'sortable'}>
                        {heading}
                      </th>
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
          currentPage={currentPage}
          paginate={paginate}
        />
      
      </div>
      <Footer />
    </div>
  );
}

export default AjjFat;
