const api = "https://api.interpol.sd-lab.nl/api";

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

const dataLayer = () => {
    let groupsData = [];

    const fetchAllData = async () => {
        const groups = await getGroups();
        if (groups.length > 0) {
            for (const group of groups) {
                let dataRow = group;

                const students = await getStudents(group.id);
                dataRow.students = students;

                const challenges = await getChallenges(group.id);

                for (const challenge of challenges) {
                    await getChallenge(challenge.challenge_id)
                        .then(data => {
                            challenge['name'] = data[0].name;
                            challenge['minimum_points'] = data[0].minimum_points;
                            challenge['time_limit'] = data[0].time_limit;
                        }).catch(error => console.error(error));
                }
                dataRow.challenges = challenges;

                groupsData.push(dataRow);
            }
        } else {
            console.warn('No groups found.');
        }

        return groupsData;
    };

    return fetchAllData();
}

export const checkSession = async () => {
    try {
        const response = await fetch(`${api}/check-type`, {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();

        if (userData && userData.error) {
            console.error('Error checking session:', userData.error);
            return false;
        }

        // Check if user is logged in as DOCENT
        return userData === 'DOCENT' ? true : false;

    } catch (error) {
        console.error('Error checking session:', error);
        return false;
    }
}

export default dataLayer;