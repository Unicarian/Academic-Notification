import { useState, useEffect } from 'react';

export function useStudentData(studentID,programFilter) {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`http://theinfinity.rocks:8227/getStudentReport?generateNewIfNotFound=true&studentID=${studentID}&programFilter=${programFilter}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch student data for ID: ${studentID}`);
                }
                const data = await response.json();
                setStudentData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (studentID) {
            fetchStudentData();
        }
    }, [studentID]);

    return { studentData, loading, error };
}


export function useStudentPrograms(studentID) {
    const [studentProgramData, setStudentProgramData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentProgramData = async () => {
            try {
                const response = await fetch(`http://theinfinity.rocks:8227/getStudentProgramRequirementStructure?generateNewIfNotFound=true&studentID=${studentID}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch student programs for ID: ${studentID}`);
                }
                const data = await response.json();
                setStudentProgramData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (studentID) {
            fetchStudentProgramData();
        }
    }, [studentID]);

    return { studentProgramData, loading, error };
}

export function useRequirementCourses(reqGroup,reqNum) {
    const [reqProgramInfo, setReqProgramInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReqProgramInfo = async () => {
            try {
                const response = await fetch(`http://theinfinity.rocks:8227/getCourseFulfillmentOptions?reqGroup=${reqGroup}&requirement=${reqNum}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch programs for req: ${reqGroup} : ${reqNum}`);
                }
                const data = await response.json();
                setReqProgramInfo(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (reqGroup,reqNum) {
            fetchReqProgramInfo();
        }
    }, [reqGroup,reqNum]);

    return { reqProgramInfo, loading, error };
}
