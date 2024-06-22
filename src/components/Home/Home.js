import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className='heading-div'>
      {/* <img src="https://logolook.net/wp-content/uploads/2021/06/Target-Logo-1968-2048x1152.png" alt="Company Logo" className="heading-logo" /> */}
      <h1 className="red-text">Target ScanPro</h1>
      </div>
      <p className='heading-text'>Analyse suspicious files to detect malware and other breaches</p>
      <nav className="home-nav-links">
        {/* <Link to="/file-upload" className="home-nav-links file-upload-link">FILE UPLOAD</Link>
        <Link to="/search" className="home-nav-links analysisID-link">ANALYSIS ID</Link> */}
        <NavLink to="/file-upload" className={({ isActive }) => isActive ? "home-nav-links file-upload-link active" : "home-nav-links file-upload-link"}> FILE UPLOAD </NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? "home-nav-links analysisID-link active" : "home-nav-links analysisID-link"}> ANALYSIS ID </NavLink>
      </nav>
    </div>
  );
};

export default Home