const dataLayer = () => {
    let groupsData = [];

    const getGroups = async () => {
        try {
            const response = await fetch("https://api.jeffvanderheijden.nl/api/groups");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getStudents = async (groupId) => {
        try {
            const response = await fetch(`https://api.jeffvanderheijden.nl/api/students-by-group?id=${groupId}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getChallenges = async (groupId) => {
        try {
            const response = await fetch(`https://api.jeffvanderheijden.nl/api/challenges-by-group?id=${groupId}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const fetchAllData = async () => {
        const groups = await getGroups();

        for (const group of groups) {
            let dataRow = group;

            const students = await getStudents(group.id);
            dataRow.students = students;

            const challenges = await getChallenges(group.id);
            dataRow.challenges = challenges;

            groupsData.push(dataRow);
        }

        return groupsData;
    };

    return fetchAllData();
}

export default dataLayer;