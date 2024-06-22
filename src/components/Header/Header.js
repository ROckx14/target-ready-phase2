import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="https://logolook.net/wp-content/uploads/2021/06/Target-Logo-1968-2048x1152.png" alt="Company Logo" className="logo" />
        <span className="company-name">Target India</span>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
    </header>
  );
};

export default Header;
