import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';
import { FiArrowLeft, FiSettings } from 'react-icons/fi';





export default function ElectiveRequirements(){
    const { studentID } = useParams('studentID');
    const { requirement } = useParams('requirement');


    const handleWishlist = e => {
        //Add wishlist interaction here
        //Currently a placeholder since we will not have access to the real Database ourselves
        alert('Added to Wishlist!');
    }

    function CourseInfo(props){
        return <div class='course-info'>
            <h3> {props.name} </h3>
            <p> {props.desc} </p>
            <button class="wishlist-button" onClick={handleWishlist}> Add to Wishlist </button>
        </div>
    }



    const navigate = useNavigate();
    
    const PlaceholderCourses = [
        { name: `${requirement} Course 1`, desc: `Interesting things about ${requirement} course 1` },
        { name: `${requirement} Course 2`, desc: `Interesting things about ${requirement} course 2 but really really long zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz` },
        { name: `${requirement} Course 3`, desc: `Interesting things about ${requirement} course 3` }
    ];


    return(
        <div class="elective-requirements">
            {/* Header */}
            <div className="header">
                <FiArrowLeft className="back-button" onClick={() => {navigate(-1)}} />
                <h2 className='header-title'>Elective Requirements</h2>
                <FiSettings className="setting-icon" />
            </div>
            

            <div class="course-list">
                {PlaceholderCourses.map((course) => (
                    <CourseInfo name={course.name} desc={course.desc} />
                ))}
            </div>
        </div>
    );
}
