import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import './ResultBox.css'
import ResultDetails from '../ResultDetails/ResultDetails';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const ResultBox = ({analysisId, setanalysisId, copied, setCopied, fileUploadResult, resultDetails}) => {

  var resultNature = "";

  if(fileUploadResult == "Malicious" || fileUploadResult == "Suspecious"){
    resultNature = "warning";
  }
  else if(fileUploadResult == "No Malware Found") {
    resultNature = "safe";
  }
  else {
    resultNature = "neutral";
  }

  const [showDetails,setShowDetails] = useState(false);

  const detailsbuttonhandler = () => {
    setShowDetails(true);
  }

  const hideDetailsHandler = () => {
    setShowDetails(false);
  }

  return (
    <div>
      <div className={'result-box-' + resultNature}>
          {analysisId && <p>Please scan using the Analysis ID: </p>}
          {analysisId && 
          <div className ='copy-section'>
          <input value={analysisId} onChange={({target : { value }}) => setanalysisId(value)} className='copy-box'></input> 
          <CopyToClipboard text={analysisId}>
          <img src='https://www.svgrepo.com/show/309480/copy.svg' alt='copy' className='copy-img' onClick={()=>{setCopied(true)}}/>
          </CopyToClipboard>
          </div>}
          {fileUploadResult && <p> <b>Verdict: </b> {fileUploadResult}</p>}
          {copied && <p className='info'>copied</p>}
        </div>
        {resultNature=="warning" && <p className='details-content'>from a total of 70 vendors that VirusTotal scans from, {Object.keys(resultDetails).length} vendors claim that the file is Malicious</p>}
        { resultNature === "warning" && !showDetails &&
          <button onClick={detailsbuttonhandler} className='details-button'> show details </button>
        }
        {showDetails && <ResultDetails resultDetails={resultDetails}/>}
        {showDetails && <button onClick={hideDetailsHandler} className='hide-button'>Hide</button>}
    </div>




  )
}

export default ResultBox
