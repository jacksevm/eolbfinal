import React, { useEffect, useState } from 'react';
import './Table.css';
import { Helmet } from 'react-helmet';

function Search({ handleSearch }) {
  return (
    <div className="search-container">
      <input type="text" className="search-input" placeholder="Search PH..." onChange={handleSearch} />
    </div>
  );
}

function Pagination({ totalItems, itemsPerPage, currentPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <Helmet>
         <title>EOLB Check List</title>
        <meta name="description" content="Google Sheet Interface for Chennai Division" />
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

function WorkProgress() {
  const [data, setData] = useState([]);
  const [tableHeading, setTableHeading] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('Enter API_URL')
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
          setTableHeading('Data From Google Sheet');
        }
      })
      .catch(apiError => {
        console.error('Error fetching data from API:', apiError);
        fetch('./data/workprogress.json')
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
          .catch(localError => {
            console.error('Error fetching local data:', localError);
          });
      });
  }, []);

  const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleSort = column => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter(item => item['PH'].toString().startsWith(searchTerm)) // Adjust filtering to work with numerical values
    .sort((a, b) => {
      if (sortColumn) {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];
        const comparison = sortOrder === 'asc' ? 1 : -1;
        return columnA - columnB * comparison; // Ensure proper numerical sorting
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
                   heading !== 'Sno' && (
                  <tr key={rowIndex}>
                    {headings.map((heading, colIndex) => (
                       
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

export default WorkProgress;
