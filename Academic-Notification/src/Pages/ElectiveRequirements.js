import React from "react";
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import '../styles.css';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';
import NavBar from "../components/NavBar";

import { useRequirementCourses } from '../hooks/useStudentData';

export default function ElectiveRequirements(){

    const [searchParams] = useSearchParams();
    const { studentID } = useParams('studentID');
    const { reqGroup } = searchParams.get('reqGroup');
    const { reqNum } = searchParams.get('reqNum');

    const handleWishlist = e => {
        //Add wishlist interaction here
        //Currently a placeholder since we will not have access to the real Database ourselves
        alert('Added to Wishlist!');
    }

    function CourseInfo(props){
        return <div class='course-info'>
            <h2> {props.name} </h2>
            <p> {props.desc} </p>
            <button class="wishlist-button" onClick={handleWishlist}> Add to Wishlist </button>
        </div>
    }


    const navigate = useNavigate();

    const { reqProgramInfo, loading, error } = useRequirementCourses(reqGroup,reqNum);

    if (loading) {
        console.log("loading 35");
        return <div>Loading course data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);
    console.log(reqProgramInfo);

    return(
        <div class="elective-requirements">
            {/* Header */}
            <div className="header">
                <FiArrowLeft className="back-button" onClick={() => {navigate(-1)}} />
                <h2 className='header-title'>Elective Requirements</h2>
                <FiSettings className="setting-icon" />
            </div>
            <div class="course-list">
                {reqProgramInfo.map((course) => (
                    <CourseInfo name={course.name} desc={course.desc} />
                ))}
            </div>
        </div>
    );
}
