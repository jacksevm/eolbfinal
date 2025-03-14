import React, { useEffect, useState } from 'react';

const GoogleSheetDataPage = () => {
  const [data, setData] = useState([]);
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Google Sheet Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              {data[0] && data[0].map((header, index) => (
                <th key={index} className="border px-4 py-2 text-left font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border px-4 py-2 text-gray-700">{cell}</td>
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

