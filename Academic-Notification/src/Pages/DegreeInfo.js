import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useStudentData } from '../hooks/useStudentData';
import '../styles.css';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';
import { PieChart } from '@mui/x-charts/PieChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import NavBar from '../components/NavBar';

export default function DegreeInfo() {
  const { studentID } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const program = searchParams.get('program');
  const { studentData, loading, error } = useStudentData(studentID, program);

  if (loading) {
    return <div>Loading student data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalRequirements = studentData.req_count;
  const satisfiedRequirements = studentData.req_satisfied;
  const remainingRequirements = totalRequirements - satisfiedRequirements;

  console.log(program);
  console.log(studentID);

  const COLORS = ['#00274C', '#73BAE8'];

  const getGroupClass = (group) => {
    // switch (group.rqrmnt_group) {
    //   case 'general_education': return 'general-education-group';
    //   case 'major_requirements': return 'major-requirements-group';
    //   case 'electives': return 'electives-group';
    // }
    return 'major-requirements-group';
  };

  // RequirementLists is not used so it can be removed or updated as needed
  function RequirementLists({ jsonData }) {
    if (!jsonData || !jsonData.groups) {
      return { satisfiedGroups: [], unsatisfiedGroups: [] }; // Return empty arrays if no data
    }
    // You can expand this function to actually render something
  }

  const satisfiedGroups = (studentData.groups || []).filter(group => group.satisfied);
  const unsatisfiedGroups = (studentData.groups || []).filter(group => !group.satisfied);

  const total = 120;
  const percentRemaining = total ? ((unsatisfiedGroups.length * 3) / total) * 100 : 0;

  const uData = [4000, 3000, 2000];
  const xLabels = ['Required', 'Gen. Electives', 'In Major Electives'];

  return (
    <div className="degree-progress-info full-page-layout">
      <div className="main-content">
        <div className="header">
          <FiArrowLeft className="back-button" onClick={() => navigate(-1)} />
          <h2 className="header-title">Degree Information {studentID}</h2>
          <FiSettings className="setting-icon" />
        </div>
        <div className="NavbarHolder">
          <NavBar />
          <div className="content-justify">
            <div className="scrollable-box">
              <div className="box-grid">
                {studentData.groups?.flatMap((group) =>
                  group.requirements.map((requirement, index) => (
                    <button
                      key={`${group.rqrmnt_group}-${index}`}
                      className={`boxbutton ${getGroupClass(group)}`}
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
                      <div className="requirement-content">
                        <div className="requirement-descr">
                          {requirement.descr || group.label}
                        </div>
                        <div className="requirement-status">
                          {requirement.rl_status ? (
                            <p
                              dangerouslySetInnerHTML={{
                                __html:
                                  requirement.rl_status +
                                  (requirement.rl_descr ? `<br/>${requirement.rl_descr}` : ""),
                              }}
                            />
                          ) : (
                            <p>Status not available</p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          


        <div className="requirement-progress">
          <ChartContainer
            width={500}
            height={300}
            series={[
              {
                data: uData,
                label: 'Credits',
                type: 'bar',
                color: COLORS[0],
              },
            ]}
            xAxis={[{ scaleType: 'band', data: xLabels }]}
          >
            <BarPlot />
          </ChartContainer>

          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: percentRemaining, label: 'Remaining', color: COLORS[0] },
                  { id: 1, value: 100 - percentRemaining, label: 'Completed', color: COLORS[1] },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
    </div>
        </div>
  );
}
