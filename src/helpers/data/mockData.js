// mockData.js

export const mockLogin = async () => {
    console.log("Mock login used");
    return true;
};

export const mockCheckSession = async () => {
    console.log("Mock session: logged in as teacher");
    return true;
};

export const mockGroups = async () => {
    return [
        {
            "id": 1,
            "name": "De hakkende hackers",
            "class": "D2X",
            "image_url": "uploads\/6855b8ce2e3af.png"
        }
    ];
};

export const mockStudents = async (groupId) => {
    return [
        {
            "id": 1,
            "name": "Student A",
            "student_number": 101010
        },
        {
            "id": 2,
            "name": "Student B",
            "student_number": 111111
        }
    ]
};

export const mockChallenges = async (groupId) => {
    return [
        {
            "id": 1,
            "group_id": groupId,
            "challenge_id": 1,
            "completed": 0,
            "points": null,
            "point_deduction": null,
            "keycode": "8JPA2-D73YB-BY"
        }
    ]
};

export const mockChallengeById = async (challengeId) => {
    return [
        {
            "id": challengeId,
            "name": "Introduction",
            "time_limit": 7600,
            "minimum_points": 500
        },
    ];
};
