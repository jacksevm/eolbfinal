import React, { useEffect, useState } from 'react';

const GoogleSheetDataPage = () => {
  const [data, setData] = useState([]);
  const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkJiM-Ke_p6l2F8aeUpFx5fctHI0AiDjN43eXnROEaMxpgwyR4j_9D4_ZcRgqj9x8APy5Ndkj1GWpB/pub?output=csv';

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
      <h2 className="text-2xl font-bold mb-4">Google Sheet Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {data[0] && data[0].map((header, index) => (
                <th key={index} className="border px-4 py-2 bg-gray-100 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border px-4 py-2">{cell}</td>
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
