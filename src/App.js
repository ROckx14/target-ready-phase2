import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import FileUpload from './components/FileUpload/FileUpload';
import AnalysisSearch from './components/AnalysisSearch/AnalysisSearch';
import About from './components/About/About';
import UploadResult from './components/UploadResult/UploadResult';
import AnalysisResult from './components/AnalysisResult/AnalysisResult';
import './App.css';
import ResultDetails from './components/ResultDetails/ResultDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/file-upload" element={<FileUpload />} />
            <Route path="/search" element={<AnalysisSearch />} />
            <Route path="/about" element={<About />} />
            <Route path="/upload-result" element={<UploadResult />} />
            <Route path="/analysis-result" element={<AnalysisResult />} />
            <Route path="/result-details" element={<ResultDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


