const api = "https://api.interpol.sd-lab.nl/api";

export const login = async (formData) => {
    try {
        const response = await fetch('https://api.interpol.sd-lab.nl/api/create-session', {
            method: 'POST',
            body: formData,
            credentials: 'include' // Ensure cookies are included with the request
        });

        const responseText = await response.text(); // Read the raw response body as text

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const loginResponse = JSON.parse(responseText); // Parse the response text as JSON

        // Do something with the login response, e.g., handle login success or error
        if (loginResponse.error) {
            console.error('Login error:', loginResponse.error);
            return loginResponse.error;
        } else {
            console.log('Login successful:', loginResponse.message);
            return true;
        }

    } catch (error) {
        console.error('Error creating session:', error);
    }
}

export const getStudents = async (groupId) => {
    try {
        const response = await fetch(`${api}/students-by-group?id=${groupId}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getGroups = async () => {
    try {
        const response = await fetch(`${api}/groups`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getChallenges = async (groupId) => {
    try {
        const response = await fetch(`${api}/challenges-by-group?id=${groupId}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getChallenge = async (challengeId) => {
    try {
        const response = await fetch(`${api}/challenge-by-id?id=${challengeId}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const removeStudent = async (studentId) => {
    try {
        const response = await fetch(`${api}/remove-student?id=${studentId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createTeam = async (formData, setTeamSuccessfullyCreated) => {
    try {
        const response = await fetch(`${api}/create-team`, {
            method: 'POST',
            body: formData,
        });
        const newTeam = await response.text();
        if (JSON.parse(newTeam).message) {
            setTeamSuccessfullyCreated(true);
        }
    } catch (error) {
        console.error('Error creating team:', error);
    }
}

export const removeTeam = async (groupId) => {
    try {
        const response = await fetch(`${api}/remove-group?group_id=${groupId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}


const dataLayer = async () => {
    let groupsData = [];

    const fetchAllData = async () => {
        try {
            const groups = await getGroups();
            if (groups.length > 0) {
                groupsData = await Promise.all(groups.map(async (group) => {
                    const students = await getStudents(group.id);
                    const challenges = await getChallenges(group.id);

                    console.log(challenges);

                    // Fetch challenge details concurrently
                    const detailedChallenges = await Promise.all(challenges.map(async (challenge) => {
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
                            return challenge; // Return the challenge without additional details if an error occurs
                        }
                    }));

                    return {
                        ...group,
                        students,
                        challenges: detailedChallenges,
                    };
                }));
            } else {
                console.warn('No groups found.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        return groupsData;
    };

    return fetchAllData();
};

export const checkSession = async () => {
    try {
        const response = await fetch(`${api}/check-type`, {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        });

        const responseText = await response.text();
        const loggedInType = responseText.replaceAll('"', '');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response && response.error) {
            console.error('Error checking session:', userData.error);
            return false;
        }

        // Check if user is logged in as DOCENT
        return loggedInType === 'DOCENT' ? true : false;

    } catch (error) {
        console.error('Error checking session:', error);
        return false;
    }
}

export default dataLayer;