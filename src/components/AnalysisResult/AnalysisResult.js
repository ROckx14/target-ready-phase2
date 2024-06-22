import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AnalysisResult.css';

const AnalysisResult = () => {
  const location = useLocation();
  const { searchResult } = location.state || {};
  const navigate = useNavigate();

  const handleSearchAnother = () => {
    navigate('/search');
  };

  return (
    <div className="analysis-result-box">
      {searchResult ? (
        <div>
          <p>{searchResult.message}</p>
          {searchResult.success && (
            <div>
              <p>Analysis ID: {searchResult.analysisId}</p>
              <p>Status: {searchResult.status}</p>
            </div>
          )}
        </div>
      ) : (
        <p>No search result available.</p>
      )}
      <div className="button-group">
        <button onClick={handleSearchAnother}>Back</button>
      </div>
    </div>
  );
};

export default AnalysisResult;
