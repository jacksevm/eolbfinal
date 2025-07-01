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
      item['LC]()
