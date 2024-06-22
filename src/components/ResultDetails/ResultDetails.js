import React, { useEffect, useState } from 'react'
import './ResultDetails.css'

const ResultDetails = ({resultDetails}) => {

  const [details, setDetails] = useState({});

  useEffect(()=>{
    setDetails(resultDetails);
  },[]);

  // const exampleResponse = resultDetails;

  // const exampleResponse = {
  //   SUPERAntiSpyware: 'NotAThreat.EICAR[TestFile]',
  //   K7AntiVirus: 'EICAR_Test_File',
  //   ViRobot: 'EICAR-test',
  //   K7GW: 'EICAR_Test_File'
  // };
  console.log(resultDetails);

  return <div className='details-box'>
    <h3 className='details-heading'>DETAILS</h3>
    {/* <ul className='list-group'>
      {Object.entries(details).map(([key, value]) => (
        <li key={key} className='list-group-item'>
          <p>{key}</p><p>{value}</p>
        </li>
      ))}
    </ul> */}
    <table className='details-table'>
      <thead>
        <tr className='head-row'>
          <th>VENDOR</th>
          <th>OBSERVATION</th>
      </tr>
      </thead>
      {Object.entries(details).map(([key,value]) => (
        <tbody>
          <tr className='row-entries' key={key}>
            <td>{key}</td>
            <td>{value}</td>
        </tr>
        </tbody>
      ))}
    </table>
  </div>
}

export default ResultDetails
