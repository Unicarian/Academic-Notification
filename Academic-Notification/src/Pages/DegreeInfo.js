import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useStudentData } from '../hooks/useStudentData';
import '../styles.css';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';
import { PieChart } from '@mui/x-charts/PieChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import NavBar from "../components/NavBar";

export default function DegreeInfo() {
  const { studentID } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const program = searchParams.get('program');
  const { studentData, loading, error } = useStudentData(studentID,program);
 
  if (loading) {
    return <div>Loading student data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalRequirements = studentData.req_count;
  const satisfiedRequirements = studentData.req_satisfied;
  const remainingRequirements = totalRequirements - satisfiedRequirements;
  console.log(program)
  console.log(studentID)

  const data = [
    { name: 'Satisfied', value: satisfiedRequirements },
    { name: 'Remaining', value: remainingRequirements },
  ];

  function RequirementLists({ jsonData }) { 
    //console.log(jsonData)
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
    return (satisfied.length / total) * 100;
  }

  const COLORS = ['#0088FE', '#FF8042'];

  const { satisfiedGroups, unsatisfiedGroups } = RequirementLists({ jsonData: studentData }); // Get lists
  const percent = PercentageSatisfied(satisfiedGroups, unsatisfiedGroups);


  const uData = [4000, 3000, 2000];
  const xLabels = [
    'Required',
    'Gen. Electives',
    'In Major Electives',
  ];


  return (
    <div className="degree-progress-info full-page-layout">
      <NavBar />  {/* Sidebar navigation */}
      
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <FiArrowLeft className="back-button" onClick={() => {navigate(-1)}} />
          <h2 className="header-title">Degree Information {studentID}</h2>
          <FiSettings className="setting-icon" />
        </div>
  
        <div className="content-justify">
  {/* Scrollable Content */}
  <div className="scrollable-box">
    <div className="box-grid">
      {studentData.groups.flatMap((group) =>
        group.requirements.map((requirement, index) => (
          <button
            key={`${group.rqrmnt_group}-${index}`}
            className="boxbutton"
            onClick={() =>
              navigate(
                `/elective-requirements/${studentID}?reqGroup=${group.rqrmnt_group}&reqNum=${requirement.requirement}`,
                {
                  state: {
                    studentData,
                    group,
                    requirement,
                  },
                }
              )
            }
          >
            <div className="adjust-font-to-half-container-size">
              {requirement.descr || group.label}
            </div>
            <div className="adjust-font-to-half-container-size">
              {requirement.rl_status ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: requirement.rl_status + "\n" + requirement.rl_descr,
                  }}
                />
              ) : (
                <p>Status not available</p>
              )}
            </div>
          </button>
        ))
      )}
    </div>
  </div>
</div>


  
  
        
        {/* Progress Section */}
        <div className="requirement-progress">
          <ChartContainer
            width={500}
            height={300}
            series={[{ data: uData, label: 'uv', type: 'bar' }]}
            xAxis={[{ scaleType: 'band', data: xLabels }]}
          >
            <BarPlot />
          </ChartContainer>
  
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: percent, label: 'Completed' },
                  { id: 1, value: (100 - percent), label: 'Remaining' },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
  
}
