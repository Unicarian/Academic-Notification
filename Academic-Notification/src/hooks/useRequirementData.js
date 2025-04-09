import { useState, useEffect } from 'react';
import academicRequirements from './academic_requirement.json'; // Import the JSON file

export function useAcademicRequirements() {
    const [requirementsData, setRequirementsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                // Simulate fetching data (since it's already imported)
                await new Promise(resolve => setTimeout(resolve, 100)); // Optional: Simulate a short delay

                setRequirementsData(academicRequirements);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRequirements();
    }, []); // Empty dependency array means this runs only once on mount

    return { requirementsData, loading, error };
}