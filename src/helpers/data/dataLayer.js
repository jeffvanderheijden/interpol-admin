import * as mock from './mockData.js';
const isMock = process.env.GATSBY_ENABLE_MOCK_AUTH === 'true';

console.log(`Using ${isMock ? 'mock' : 'real'} data layer.`);

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
        const responseText = await response.text();
        const contentType = response.headers.get("Content-Type");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
        }

        // Alleen JSON parsen als de content-type JSON is
        if (contentType && contentType.includes("application/json")) {
            try {
                return JSON.parse(responseText);
            } catch (error) {
                console.warn("Response was not valid JSON, returning raw text", error);
                return responseText; // fallback
            }
        }

        // Anders gewoon raw text teruggeven
        return responseText;
    } catch (error) {
        console.error(`Error in fetchWrapper: ${error.message}`);
        throw error;
    }
};

// Login functionality (uses session cookies)
export const login = async (formData) => {
    if (isMock) return await mock.mockLogin();

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
    if (isMock) return await mock.mockStudents(groupId);

    return await fetchWrapper(`${api}/students-by-group?id=${groupId}`);
};

// Get groups
export const getGroups = async () => {
    if (isMock) return await mock.mockGroups();

    return await fetchWrapper(`${api}/groups`);
};

// Get challenges by group
export const getChallenges = async (groupId) => {
    if (isMock) return await mock.mockChallenges(groupId);

    const result = await fetchWrapper(`${api}/challenges-by-group?id=${groupId}`);

    if (!Array.isArray(result)) {
        console.warn(`getChallenges for group ${groupId} did not return an array:`, result);
        return []; // fallback naar lege array
    }

    return result;
};

// Get a specific challenge
export const getChallenge = async (challengeId) => {
    if (isMock) return await mock.mockChallengeById(challengeId);

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
export const editGroup = async (data) => {
    const url = `${api}/update-group`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    };

    try {
        const response = await fetchWrapper(url, options);
        return response;
    } catch (error) {
        console.error('Error updating group:', error);
        throw error;
    }
};

export const updateGroupChallenge = async (formData) => {
    const url = `${api}/update-group-challenge`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', // Send JSON content
        },
        body: JSON.stringify({
            group_id: formData.group_id,
            challenge_id: formData.challenge_id,
            points: formData.points,
        }),
        credentials: 'include'
    };

    try {
        const response = await fetchWrapper(url, options);
        return response;
    } catch (error) {
        console.error('Error updating group: ', error);
        throw error;
    }
}

// Update points for group
export const updatePoints = async (groupId, pointsData) => {
    if (isMock) return await mock.mockCheckSession();

    const url = `${api}/update-points`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            group_id: groupId,
            points: pointsData, // [{ challengeId: 2, points: 10 }, ...]
        }),
    };

    try {
        const response = await fetchWrapper(url, options);
        // Return the JSON response from your backend
        return response;
    } catch (error) {
        console.error('Error updating points:', error);
        return { error: true, message: error.message };
    }
};

// Check session
export const checkSession = async () => {
    if (isMock) return await mock.mockCheckSession();

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
        let groups = await getGroups();
        if (!Array.isArray(groups)) {
            console.warn('getGroups did not return an array:', groups);
            groups = [];
        }

        const groupsData = await Promise.all(
            groups.map(async (group) => {
                let students = await getStudents(group.id);
                if (!Array.isArray(students)) {
                    console.warn(`getStudents for group ${group.id} did not return an array:`, students);
                    students = [];
                }

                let challenges = await getChallenges(group.id);
                if (!Array.isArray(challenges)) {
                    console.warn(`getChallenges for group ${group.id} did not return an array:`, challenges);
                    challenges = [];
                }

                const detailedChallenges = await Promise.all(
                    challenges.map(async (challenge) => {
                        try {
                            const challengeData = await getChallenge(challenge.challenge_id);
                            const data = Array.isArray(challengeData) ? challengeData[0] : challengeData;

                            if (!data || data.error) return challenge;

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