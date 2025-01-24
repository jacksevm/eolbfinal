import React from 'react';



function WorkProgress() {

  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTaKOyz-I2Z2k3ge43s3jDDkD_bCa4776Af34YF7cqMe53f_aE34rvVBJwT3AmULQ/pubhtml'; // Replace with your sheet's published URL



  return (

     <div className="card">
          
            <div className="card-info">
              <h3>
    Note:
1.Greey Colour Vertical line denotes Current Date.
2.Green Colour in Horizintal Bar Shows Progress of Task Till date.
3.Red Colour Horizontal Bar shows Task to be done.
4.Red colour Horizontal bar before the Vertical line denotes Pending task as on date
5.Green Colour Horizontal bar after the vertical line denotes Task progressing ahead
  </h3>
            </div>

    <iframe

      title="DDS - WORK PROGRESS"

      src={sheetUrl}

      width="100%"

      height="600"

      style={{ border: 'none' }}

    ></iframe>

  );

}



export default WorkProgress;
