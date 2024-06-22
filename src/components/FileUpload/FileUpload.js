
import React, { useState } from 'react';
import './FileUpload.css';
import Home from '../Home/Home';
import ContentBox from '../ContentBox/ContentBox';
import ResultBox from '../ResultBox/ResultBox';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisId,setanalysisId] = useState("");
  const [fileUploadResult,setFileUploadResult] = useState("");
  const [copied,setCopied] = useState(false);
  const [resultDetails,setResultDetails] = useState({});
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileUploadResult("");
    setCopied(false);
    setanalysisId("");
    if (file.size > 32 * 1024 * 1024) { // 32 MB in bytes
      window.alert('File is greater than 32 MB. Upload a file less than 32 MB.');
      event.target.value = null;
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const handleNewUpload = () => {
    // Reset all states
    setSelectedFile(null);
    setError('');
    setFileUploadResult('');
    setanalysisId('');
    setCopied(false);

    // Navigate to the root and then back to '/file-upload' to force a re-render
    navigate('/');
    //navigate('/file-upload');
    setTimeout(() => navigate('/file-upload'), 0);
  };


  const handleUpload = () => {
    if (!selectedFile) {
      window.alert('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch("http://localhost:8080/api/upload", { //MjI0MTZmYjMxY2ViODJlZDc2Y2Y2ZmE1OTM4MjE5OTA6MTcxODc4NjE1NQ==
    method: "POST",
    body: formData
    })
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then((data) => {
      console.log(data);
      if(data.slice(-2) === "=="){
        const id = data.slice(-60);
        setanalysisId(id);
        console.log(id);
      }
      else if(data === "File is being scanned at VirusTotal, Please try again after some time") {
        setError(data);
      }
      else {
        const resp = JSON.parse(data);
        console.log(resp);
        const responseText  = resp.Verdict[0];
        console.log(responseText);
        if(responseText === "No Malware Found") {
          setFileUploadResult(responseText);
        }
        else {
          setFileUploadResult(responseText);
          setResultDetails(resp.MalwareType[0]);
        }
      }
    })
    .catch((error) => {
    window.alert('File upload failed.');
    console.error(error);
    });

    setCopied(false);

  };

  return (
    <>
      <Home/>
      <div className="file-upload-box">
        <h3 className='file-upload-heading'>Upload your file</h3>
        <img src='https://png.pngtree.com/png-clipart/20230328/original/pngtree-scan-line-icon-png-image_9006782.png' alt='scan' className='scan-logo'/>
        <input type="file" onChange={handleFileChange} />
        {selectedFile && <p className='file-name'>Selected file: {selectedFile.name}</p>}
        {error && <p className='error-text'>{error}</p>}
        {!selectedFile && <p className='file-size-warning'>Note: file size should be less than 32MB</p>}
        <div className="button-group">
          {/* <button onClick={() => navigate('/')}>Back</button> */}
          {!fileUploadResult && !analysisId && <button onClick={handleUpload}>Upload</button>}
        </div>
        { (fileUploadResult || analysisId) && <ResultBox analysisId={analysisId} setanalysisId={setanalysisId} copied={copied} setCopied={setCopied} fileUploadResult={fileUploadResult} resultDetails={resultDetails}/>}
      </div>
      {/* <button onClick={() => navigate('/')} className='back-button'>Back</button> */}
      {!fileUploadResult && !analysisId && <ContentBox/>}
      <div className="button-group">
        {(fileUploadResult || analysisId) && <button onClick={handleNewUpload} className='new-upload'>Upload New File</button>}
        <button onClick={() => navigate('/')} className='back-button'>Back</button>
        {analysisId && <button onClick={() => navigate('/search')}>To Analysis Search</button>}
      </div>
    </>
  )
};

export default FileUpload;

