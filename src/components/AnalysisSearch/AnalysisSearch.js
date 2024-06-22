import React, { useState } from 'react';
import { useNavigate,  } from 'react-router-dom';
import './AnalysisSearch.css';
import Home from '../Home/Home';
import ResultBox from '../ResultBox/ResultBox';

const AnalysisSearch = () => {
  const [analysisId, setAnalysisId] = useState("");
  const [error, setError] = useState('');
  const [scanResult,setScanResult] = useState("");
  const [resultDetails,setResultDetails] = useState({});
  const navigate = useNavigate();

  const handleNewSearch = () => {

  }

  const validateAnalysisId = (id) => {
    return id.length >= 2 && id.slice(-2) === '==';
  };

  const handleSearch = () => {
    if (!analysisId) {
      setError('Analysis ID cannot be empty.');
      return;
    }
    if (!validateAnalysisId(analysisId)) {
      setError('Invalid Analysis ID. It should end with "==".');
      return;
    }

    if(analysisId.length !== 60) {
      setError('Invalid Analysis ID. It must contain 60 characters');
      return;
    }
    setError('');
    
    const temp = analysisId;

    fetch("http://localhost:8080/api/ScanById", {
    method: "POST",
    body: new URLSearchParams({ id: temp })
    })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      if(data === "Please try again after some time"){
        setError("Scanning under progress. Please try again after some time");
        setTimeout(() => {
          setError('');
        }, 5000);
      }
      else if(data === "Please enter a valid Analysis Id" ){
        setError(data);
      }
      else {
        console.log(data);
        const resp = JSON.parse(data);
        console.log(resp);
        const responseText  = resp.Verdict[0];
        console.log(responseText);
        if(responseText === "No Malware Found") {//|| responseText === "Malicious" || responseText === "Suspecious") {
          setScanResult(responseText);
        }
        else {
          setScanResult(responseText);
          setResultDetails(resp.MalwareType[0]);
          console.log(resp.MalwareType);
        }
      }
    })
    .catch((error) => {
    window.alert('File upload failed.');
    console.error(error);
    });

  };


  return (
    <>
      <Home/>
      <div className="analysis-search-box">
        <h3 className='file-upload-heading'>Enter analysis id</h3>
        <img src='https://static.thenounproject.com/png/459389-200.png' alt='scan' className='scan-logo'/>
        <input
          type="text"
          placeholder="Enter Analysis ID"
          value={analysisId}
          onChange={(e) => { setAnalysisId(e.target.value)
            setScanResult("")
          }}
        />
        <div className="button-group">
          {/* <button onClick={() => navigate('/')}>Back</button> */}
          <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {/* {result && <p className='result-box'> <b>Verdict: </b> {result}</p>} */}
        {scanResult && <ResultBox fileUploadResult={scanResult} resultDetails={resultDetails}/>}
        <div className="button-group">
          <button onClick={() => navigate('/')} className='back-button'>Back</button>
          {(scanResult) && <button onClick={handleNewSearch} className='new-search'>New Search</button>}
        </div>
      </div>
    </>
  );
};

export default AnalysisSearch;
