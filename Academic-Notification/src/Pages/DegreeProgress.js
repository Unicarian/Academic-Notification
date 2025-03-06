import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';
import '../css/DegreeProgress.css';
import user from '../img/user.png';

export default function DegreeProgress() {
    const { studentID } = useParams();
    const navigate = useNavigate();

    return (
        <div className="degree-progress">
            {/* Header */}
            <div className="header">
                <FiArrowLeft className="back-button" onClick={() => navigate('/')} />
                <h2 className="header-title">Degree Progress</h2>
                <FiSettings className="setting-icon" />
            </div>

            <div className="student-info">
                <div className="avatar">
                    <img src={user} alt="user-avatar" />
                </div>
                <div className="student-details">
                    <h3><strong>Student Name:</strong> John Doe</h3>
                    <h3><strong>Student ID:</strong> {studentID}</h3>
                    <h3><strong>Status:</strong> Undergraduate</h3>
                    <h3><strong>Expected Graduation Date:</strong> XX/20XX</h3>
                </div>
            </div>

            
            <div className='degree-details'>
                    <h3>Majors & Minors</h3>
                    <div className='major'>
                        <span>Major: Electrical Engineerig</span>
                        <button className="credit-report" onClick={() => navigate(`/degree-information/${studentID}`)}>Credit Report</button>
                    </div>
                    <div className='major'>
                        <span>Major: Chemical Engineerig</span>
                        <button className="credit-report">Credit Report</button>
                    </div>


            <div className="degree-details">
                <h3>Majors & Minors</h3>
                <div className="major">
                    <span>Major: Electrical Engineering</span>
                    <button className="credit-report" onClick={() => navigate(`/credit-report/${studentID}`)}>
                        Credit Report
                    </button>
                </div>
                <div className="major">
                    <span>Major: Chemical Engineering</span>
                    <button className="credit-report" onClick={() => navigate(`/credit-report/${studentID}`)}>
                        Credit Report
                    </button>
                </div>
                <div className="minor">
                    <span>Minor: Computer Science</span>
                    <button className="credit-report" onClick={() => navigate(`/credit-report/${studentID}`)}>
                        Credit Report
                    </button>
                </div>
            </div>

            <button className="summary-report">Generate Credit Summary Report</button>
        </div>
    );
}