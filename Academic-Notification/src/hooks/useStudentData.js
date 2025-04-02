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
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`http://theinfinity.rocks:8227/getStudentProgramRequirementStructure?generateNewIfNotFound=true&studentID=${studentID}  `);
                if (!response.ok) {
                    throw new Error(`Failed to fetch student programs for ID: ${studentID}`);
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
