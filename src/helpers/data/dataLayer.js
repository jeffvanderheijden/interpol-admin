const dataLayer = () => {
    let groupsData = [];

    const getGroups = async () => {
        try {
            const response = await fetch("https://api.interpol.sd-lab.nl/api/groups");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getStudents = async (groupId) => {
        try {
            const response = await fetch(`https://api.interpol.sd-lab.nl/api/students-by-group?id=${groupId}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getChallenges = async (groupId) => {
        try {
            const response = await fetch(`https://api.interpol.sd-lab.nl/api/challenges-by-group?id=${groupId}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getChallenge = async (challengeId) => {
        try {
            const response = await fetch(`https://api.interpol.sd-lab.nl/api/challenge-by-id?id=${challengeId}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const fetchAllData = async () => {
        const groups = await getGroups();

        for (const group of groups) {
            let dataRow = group;

            const students = await getStudents(group.id);
            dataRow.students = students;

            const challenges = await getChallenges(group.id);

            for (const challenge of challenges) {
                await getChallenge(challenge.challenge_id)
                    .then(data => {
                        console.log(data);
                        challenge['name'] = data[0].name;
                        challenge['minimum_points'] = data[0].minimum_points;
                        challenge['time_limit'] = data[0].time_limit;
                    }).catch(error => console.error(error));
            }
            dataRow.challenges = challenges;

            groupsData.push(dataRow);
        }

        return groupsData;
    };

    return fetchAllData();
}

export default dataLayer;