import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStudentData } from '../hooks/useStudentData';
import '../styles.css';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function DegreeInfo() {
  const { studentID } = useParams();
  const { studentData, loading, error } = useStudentData(studentID);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading student data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalRequirements = studentData.requirements;
  const satisfiedRequirements = studentData.satisfied;
  const remainingRequirements = totalRequirements - satisfiedRequirements;

  const data = [
    { name: 'Satisfied', value: satisfiedRequirements },
    { name: 'Remaining', value: remainingRequirements },
  ];

  function RequirementLists({ jsonData }) {
    if (!jsonData || !jsonData.groups) {
      return { satisfiedGroups: [], unsatisfiedGroups: [] }; // Return empty arrays if no data
    }

    const satisfiedGroups = jsonData.groups.filter((group) => group.satisfied);
    const unsatisfiedGroups = jsonData.groups.filter((group) => !group.satisfied);

    return { satisfiedGroups, unsatisfiedGroups };
  }

  function PercentageSatisfied(satisfied, unsatisfied) {
    if (!satisfied || !unsatisfied) return 0; // Prevent errors if lists are undefined
    const total = satisfied.length + unsatisfied.length;
    if (total === 0) return 0; // Prevent division by zero
    return (satisfied.length / total)*100;
  }

  const COLORS = ['#0088FE', '#FF8042'];

  const { satisfiedGroups, unsatisfiedGroups } = RequirementLists({jsonData: studentData}); // Get lists
  const percent = PercentageSatisfied(satisfiedGroups, unsatisfiedGroups);

  return (
    <div className="degree-progress-info">
      {/* Header */}
      <div className="header">
        <FiArrowLeft className="back-button" onClick={() => navigate(`/degree-progress/${studentID}`)} />
        <h2 className="header-title">Degree Information {studentID}</h2>
        <FiSettings className="setting-icon" />
      </div>

      <div className="content-justify">
        {/* Scrollable Content */}
        <div className="scrollable-box">
          <div className="box-grid">
            {studentData.groups.map((group, index) => (
              <button
                key={index}
                className="boxbutton"
                onClick={() => navigate(`/elective-requirements/${studentID}/${group.rqrmnt_group}`, { state: { studentData } })}
              >
                <div className="adjust-font-to-half-container-size">{group.label}</div>
                <div className="adjust-font-to-half-container-size">
                  {group.status ? <p dangerouslySetInnerHTML={{ __html: group.status }} /> : <p>Status not available</p>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

{/* Progress Section */}
            <div className="requirement-progress">
            <BarChart width={300} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
            <ul className="percent-progress">
          <li>{(percent ).toFixed(0)}% Complete</li>
          <li>{((100 - (percent)) ).toFixed(0)}% Remaining</li>
        </ul>
      </div>
    </div>
  );
}