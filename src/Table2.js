import React, { useState } from 'react';
import './Table.css';

const Table2 = ({ data, columns }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this value to adjust the number of items per page

  // Filter data based on search query
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* Table */}
      <table className="data-table">
        <thead>
            
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{item[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <ul className="pagination">
        {Array(Math.ceil(filteredData.length / itemsPerPage))
          .fill()
          .map((_, index) => (
            <li key={index}>
              <button onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Table2;
