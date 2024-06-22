// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './UploadResult.css'; 

// const UploadResult = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { success, message, fileName, fileSize } = state || {};

//   const handleUploadAnother = () => {
//     navigate('/upload');
//   };

//   return (
//     <div className="result-box">
//       {state ? (
//         <>
//           <p>{message}</p>
//           {success && (
//             <div>
//               <p>File Name: {fileName}</p>
//               <p>File Size: {fileSize} bytes</p>
//             </div>
//           )}
//           <button onClick={handleUploadAnother} className="upload-another-button">
//             Back
//           </button>
//         </>
//       ) : (
//         <p>No upload result to display.</p>
//       )}
//     </div>
//   );
// };

// export default UploadResult;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UploadResult.css';

const UploadResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { uploadStatus } = location.state || {};

  const handleUploadAnother = () => {
    navigate('/file-upload');
  };

  return (
    <div className="upload-result-box">
      {uploadStatus ? (
        <div>
          <p>{uploadStatus.message}</p>
          {uploadStatus.success && (
            <div>
              <p>File Name: {uploadStatus.fileName}</p>
              <p>File Size: {uploadStatus.fileSize} bytes</p>
            </div>
          )}
        </div>
      ) : (
        <p>No upload result available.</p>
      )}
      <div className="button-group">
        <button onClick={handleUploadAnother}>Upload Another File</button>
      </div>
    </div>
  );
};

export default UploadResult;
