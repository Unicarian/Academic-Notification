import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import umaine from '../img/umaine.png';
import '../styles.css';
import { FiSettings } from 'react-icons/fi';

export default function Selection() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSelectStudent = (studentID) => {
    
      console.log('Navigating to progress with student ID:', studentID);
      navigate(`/degree-progress/${studentID}`);
    
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log("Hello there")
      handleSelectStudent(search);
    
    }
  };

  return (
    <div className="selections">
      {/* Header */}
      <div className="header">
        <h2 className="header-title">Student ID Selection</h2>
        <FiSettings className="setting-icon" />
      </div>

      <div className="content-justify">
        <div className="logo-container">
          <img src={umaine} alt="Umaine Logo" height="150px" width="150px" />
        </div>

        <h1 className="title">Academic Notification</h1>

        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Enter Student ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />

        </div>
      </div>
    </div>
  );
}
