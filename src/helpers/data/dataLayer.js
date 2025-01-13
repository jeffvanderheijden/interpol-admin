const api = "https://api.interpol.sd-lab.nl/api";

/**
 * Wrapper for fetch with consistent error handling.
 * @param {string} url - The API endpoint.
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @returns {Promise<any>} - Parsed JSON response or error.
 */
const fetchWrapper = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        const contentType = response.headers.get("Content-Type");

        // Only parse as JSON if the response is JSON
        const responseText = await response.text();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
        }

        if (contentType && contentType.includes("application/json")) {
            try {
                return JSON.parse(responseText);
            } catch (error) {
                throw new Error('Failed to parse response as JSON', 'Error: ' + error + ' Response: ' + response);
            }
        }

        // If not JSON, return the raw response text (or handle as needed)
        return responseText;
    } catch (error) {
        console.error(`Error in fetchWrapper: ${error.message}`);
        throw error; // Rethrow the error for higher-level handling
    }
};

// Login functionality (uses session cookies)
export const login = async (formData) => {
    const url = `${api}/create-session`;
    const options = {
        method: 'POST',
        body: formData,
        credentials: 'include',
    };

    return await fetchWrapper(url, options);
};

// Get students by group
export const getStudents = async (groupId) => {
    return await fetchWrapper(`${api}/students-by-group?id=${groupId}`);
};

// Get groups
export const getGroups = async () => {
    return await fetchWrapper(`${api}/groups`);
};

// Get challenges by group
export const getChallenges = async (groupId) => {
    return await fetchWrapper(`${api}/challenges-by-group?id=${groupId}`);
};

// Get a specific challenge
export const getChallenge = async (challengeId) => {
    return await fetchWrapper(`${api}/challenge-by-id?id=${challengeId}`);
};

// Remove a student from a group
export const removeStudent = async (studentId) => {
    const url = `${api}/remove-student?id=${studentId}`;
    const options = {
        method: 'DELETE',
        credentials: 'include',
    };

    return await fetchWrapper(url, options);
};

// Create a team
export const createTeam = async (formData, setTeamSuccessfullyCreated) => {
    try {
        const url = `${api}/create-team`;
        const options = {
            method: 'POST',
            body: formData,
        };

        const response = await fetchWrapper(url, options);
        if (response.message) {
            setTeamSuccessfullyCreated(true);
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('Error creating team:', error);
        setTeamSuccessfullyCreated(false);
    }
};

// Remove a team
export const removeTeam = async (groupId) => {
    const url = `${api}/remove-group?group_id=${groupId}`;
    const options = {
        method: 'DELETE',
        credentials: 'include',
    };

    return await fetchWrapper(url, options);
};

// Edit a group
export const editGroup = async (formData) => {
    const url = `${api}/update-group`;
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: formData,
        credentials: 'include'
    };

    try {
        const response = await fetchWrapper(url, options);
        return response; 
    } catch (error) {
        console.error('Error updating group:', 'error: ', + error);
        throw error;
    }
};

// Check session
export const checkSession = async () => {
    const url = `${api}/check-type`;
    const options = {
        method: 'GET',
        credentials: 'include',
    };

    try {
        const response = await fetchWrapper(url, options);
        const loggedInType = response.replaceAll('"', '');
        return loggedInType === 'DOCENT';
    } catch (error) {
        console.error('Error checking session:', error);
        return false;
    }
};

// Fetch all data for groups
const dataLayer = async () => {
    try {
        const groups = await getGroups();

        if (!Array.isArray(groups)) {
            throw new TypeError('Expected groups to be an array.');
        }

        const groupsData = await Promise.all(
            groups.map(async (group) => {
                const students = await getStudents(group.id);
                const challenges = await getChallenges(group.id);

                const detailedChallenges = await Promise.all(
                    challenges.map(async (challenge) => {
                        try {
                            const [data] = await getChallenge(challenge.challenge_id);
                            return {
                                ...challenge,
                                name: data.name,
                                minimum_points: data.minimum_points,
                                time_limit: data.time_limit,
                            };
                        } catch (error) {
                            console.error(`Error fetching challenge ${challenge.challenge_id}:`, error);
                            return challenge;
                        }
                    })
                );

                return {
                    ...group,
                    students,
                    challenges: detailedChallenges,
                };
            })
        );

        return groupsData;
    } catch (error) {
        console.error('Error fetching data layer:', error);
        return [];
    }
};

export default dataLayer;