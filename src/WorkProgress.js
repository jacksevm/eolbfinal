import React from 'react';



function WorkProgress() {

  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTaKOyz-I2Z2k3ge43s3jDDkD_bCa4776Af34YF7cqMe53f_aE34rvVBJwT3AmULQ/pubhtml'; // Replace with your sheet's published URL



  return (

    <iframe

      title="Embedded Google Sheet"

      src={sheetUrl}

      width="600"

      height="400"

      style={{ border: 'none' }}

    ></iframe>

  );

}



export default WorkProgress;
