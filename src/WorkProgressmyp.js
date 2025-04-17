import React from 'react';



function WorkProgressmyp() {

  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRVQkF1J0pVDaa-DihKg4ySVVN9P_H3D_yjrSPibywI8MG1BfiWIFfRTpmrDEt4zg/pubhtml'; // Replace with your sheet's published URL

  return (


      <div className='App'>
    <div className='container'>
       
        <div className="button-container">
          <button className="google-sheets-button" onClick={() => window.open("https://docs.google.com/spreadsheets/d/1T7hyIG7s2v7lGb5vo9-4VRHnaOdtm8-b/edit?gid=1653570427#gid=1653570427", '_blank')}>
            Open Google Sheet
          </button>
        </div>
       <iframe

      title="MYP - WORK PROGRESS"

      src={sheetUrl}

      width="100%"

      height="600"

      style={{ border: 'none' }}

    ></iframe>
      </div>
      </div>

  );

}



export default WorkProgressmyp;
