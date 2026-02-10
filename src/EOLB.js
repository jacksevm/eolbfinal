import React, { useEffect, useState } from 'react';
import './Table.css';
import { Helmet } from 'react-helmet';
import Footer from './Footer';

/* ---------------- SEARCH COMPONENT ---------------- */
function Search({ handleSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search work from the list..."
        onChange={handleSearch}
      />
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
function EOLB() {
  const [data, setData] = useState([]);
  const [headings, setHeadings] = useState([]);
  const [tableHeading, setTableHeading] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const [usePagination, setUsePagination] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetch('https://sheet2api.com/v1/yhQYMB3ATSiA/kzc_list-of-works-to-be-monitored')
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(json => {
        setData(json);
        if (json.length > 0) {
          setHeadings(Object.keys(json[0]));
          setTableHeading('Data From Google Sheet');
        }
      })
      .catch(() => {
        fetch('./data/eolbdata.json')
          .then(res => res.json())
          .then(json => {
            setData(json);
            if (json.length > 0) {
              setHeadings(Object.keys(json[0]));
              setTableHeading('Data From Local Table');
            }
          });
      });
  }, []);

  /* ---------------- SEARCH ---------------- */
  const handleSearch = e => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  /* ---------------- SORT ---------------- */
  const handleSort = column => {
    if (sortColumn === column) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  /* ---------------- FILTER + SORT ---------------- */
  const filteredAndSortedItems = data
    .filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(searchTerm)
      )
    )
    .sort((a, b) => {
      if (!sortColumn) return 0;

      const valA = a[sortColumn] ?? '';
      const valB = b[sortColumn] ?? '';

      const numA = Number(valA);
      const numB = Number(valB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return sortOrder === 'asc' ? numA - numB : numB - numA;
      }

      return sortOrder === 'asc'
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });

  /* ---------------- PAGINATION ---------------- */
  const displayedItems = usePagination
    ? filteredAndSortedItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredAndSortedItems;

  const totalPages = Math.ceil(
    filteredAndSortedItems.length / itemsPerPage
  );

  /* ---------------- RENDER ---------------- */
  return (
    <div className="App">
      <Helmet>
        <title>Work Progress Data</title>
        <meta name="description" content="Google Sheet Interface" />
      </Helmet>

      <div className="container">
        <h1 className="heading">{tableHeading}</h1>

        <Search handleSearch={handleSearch} />

        <div className="toggle-pagination">
          <button
            onClick={() => {
              setUsePagination(prev => !prev);
              setCurrentPage(1);
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
                'https://docs.google.com/spreadsheets/d/1IBYwYKO2e4s0C_oM78EAb7krbsIVHQH_4luAfy2AafE/edit',
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
                  {headings
                    .filter(h => h !== 'ID')
                    .map((heading, i) => (
                      <th
                        key={i}
                        onClick={() => handleSort(heading)}
                        className={
                          sortColumn === heading
                            ? `sortable ${sortOrder}`
                            : 'sortable'
                        }
                      >
                        {heading}
                      </th>
                    ))}
                </tr>
              </thead>

              <tbody>
                {displayedItems.length > 0 ? (
                  displayedItems.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {headings
                        .filter(h => h !== 'ID')
                        .map((h, colIndex) => (
                          <td key={colIndex}>{row[h]}</td>
                        ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={headings.length} style={{ textAlign: 'center' }}>
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {usePagination && totalPages > 1 && (
          <div className="pagination-container">
            <ul className="pagination">
              {Array.from({ length: totalPages }).map((_, i) => (
                <li
                  key={i}
                  className={
                    currentPage === i + 1 ? 'page-item active' : 'page-item'
                  }
                >
                  <button
                    className="page-link"
                    onClick={() => {
                      setCurrentPage(i + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default EOLB;
