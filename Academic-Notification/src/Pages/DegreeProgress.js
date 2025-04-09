import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';
import { useStudentData, useStudentPrograms } from '../hooks/useStudentData';
import '../styles.css';
import NavBar from '../components/NavBar';
import user from '../img/user.png';

export default function DegreeProgress() {
  const { studentID } = useParams();
  const navigate = useNavigate();
  const { studentData } = useStudentData(studentID);
  const studentNames = ['Bob Ross', 'Joe Demagio', 'Cameron Diaz', 'John Johnson', 'Jake Jacobs', 'Ron Rocky', 'Adam Adams', 'Samantha Smith', 'Peter Parker', 'Ilsa Issac'];
  const graduationDates = [2024, 2025, 2026, 2027];
  const { studentProgramData, loading, error } = useStudentPrograms(studentID);

  console.log(useStudentPrograms(studentID));

  if (loading) {
    console.log("loading 17");
    return <div>Loading student data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function PseudoRandomSelect(list) {
    const item = list[studentID % list.length];
    return item;
  }


  function IdentifyType({ jsonData }) {
    if (!jsonData || !jsonData.careers || jsonData.careers.length === 0) {
      return <p>Career type not identified. Invalid Data.</p>;
    }

    const careerCode = jsonData.careers[0].career;


    switch (careerCode) {
      case 'UGRD':
        return 'Undergraduate';
      case 'GRD':
        return 'Graduate';
      case 'PHD':
        return 'PhD Candidate';
      default:
        return 'Career type not identified.';
    }
  }

  return (
    <div className="degree-progress">
      {/* Header */}
      <div className="header">
        <FiArrowLeft className="back-button" onClick={() => { navigate(-1) }} />
        <h2 className="header-title">Degree Progress</h2>
        <FiSettings className="setting-icon" />
      </div>

      


      <div className="NavbarHolder">
      <NavBar />
        <div className="content-justify">
          <div className="student-info">
            <div className="avatar">
              <img src={user} alt="user-avatar" width="300px" height="300px" />
            </div>
            <div className="student-details">
              <h3>
                <strong>Student Name:</strong> {PseudoRandomSelect(studentNames)}
              </h3>
              <h3>
                <strong>Student ID:</strong> {studentID}
              </h3>
              <h3>
                <strong>Status:</strong> {studentData && <IdentifyType jsonData={studentData} />}
              </h3>
              <h3>
                <strong>Expected Graduation Date:</strong> Spring {PseudoRandomSelect(graduationDates)}
              </h3>
            </div>
          </div>

          <div className="degree-details">
            <h3>Majors & Minors</h3>
            {studentProgramData.map((program) => (
              <div className="major">
                <span>{program.programName}</span>
                <button
                  className="credit-report"
                  onClick={() => navigate(`/degree-information/${studentID}?program=${program.programCode}`, { state: { studentData } })}
                >
                  Credit Report
                </button>
              </div>
            ))}

          </div>

          <button className="summary-report">Generate Credit Summary Report</button>
        </div>
      </div>
    </div>
  );
}
