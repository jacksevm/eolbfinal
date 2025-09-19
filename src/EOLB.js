import React, { useEffect, useState } from 'react';
import './Table.css';
import { Helmet } from 'react-helmet';
import Footer from './Footer';

function Search({ handleSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search LC Number..."
        onChange={handleSearch}
      />
    </div>
  );
}

function EOLB() {
  const [data, setData] = useState([]);
  const [tableHeading, setTableHeading] = useState('');
  const [headings, setHeadings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const [usePagination, setUsePagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://sheet2api.com/v1/yhQYMB3ATSiA/eolb-status')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
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
        fetch('./data/eolbdata.json')
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
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
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSort = column => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Filter and sort the full dataset
  const filteredAndSortedItems = data
    .filter(item =>
      item['Color']?.toString().toLowerCase() === 'red' &&
      item['LC Number']?.toString().toLowerCase().startsWith(searchTerm)
    )
    .sort((a, b) => {
      if (sortColumn !== null) {
        const columnA = String(a[sortColumn] || '').toLowerCase();
        const columnB = String(b[sortColumn] || '').toLowerCase();
        if (!isNaN(columnA) && !isNaN(columnB)) {
          return sortOrder === 'asc'
            ? columnA - columnB
            : columnB - columnA;
        } else {
          return sortOrder === 'asc'
            ? columnA.localeCompare(columnB)
            : columnB.localeCompare(columnA);
        }
      }
      return 0;
    });

  // Apply pagination only when enabled
  const displayedItems = usePagination
    ? filteredAndSortedItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredAndSortedItems;

  return (
    <div className="App">
      <Helmet>
        <title>EOLB Data</title>
        <meta
          name="description"
          content="Google Sheet Interface for Chennai Division"
        />
      </Helmet>

      <div className="container">
        <h1 className="heading">{tableHeading}</h1>

        <div className="table-container">
          <Search handleSearch={handleSearch} />

          <div className="toggle-pagination">
            <button
              onClick={() => {
                setUsePagination(prev => !prev);
                setCurrentPage(1); // Reset page on toggle
              }}
            >
              {usePagination ? 'Show All Data' : 'Enable Pagination'}
            </button>
          </div>

          <div className="button-container">
            <button
              className="google-sheets-button"
              onClick={() =>
                window.open(
                  'https://docs.google.com/spreadsheets/d/1M7YeJcjV5tJQxNR2mnsdqblVWThcFQUS9OptnZSIhf0/edit#gid=0',
                  '_blank'
                )
              }
            >
              Open Google Sheet
            </button>
          </div>

          <div className="table-wrapper">
            <div className="scrollable-table">
              <table className="data-table">
                <thead>
                  <tr>
                    {headings.map(
                      (heading, index) =>
                        heading !== 'ID' && (
                          <th
                            key={index}
                            onClick={() => handleSort(heading)}
                            className={
                              sortColumn === heading
                                ? `sortable ${sortOrder}`
                                : 'sortable'
                            }
                          >
                            {heading}
                          </th>
                        )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {displayedItems.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {headings.map(
                        (heading, colIndex) =>
                          heading !== 'ID' && (
                            <td key={colIndex}>{item[heading]}</td>
                          )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {usePagination && (
            <div className="pagination-container">
              <ul className="pagination">
                {Array.from({
                  length: Math.ceil(filteredAndSortedItems.length / itemsPerPage),
                }).map((_, i) => (
                  <li
                    key={i}
                    className={
                      currentPage === i + 1 ? 'page-item active' : 'page-item'
                    }
                  >
                    <button
                      onClick={() => {
                        setCurrentPage(i + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="page-link"
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EOLB;
