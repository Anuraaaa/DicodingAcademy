function leaderboardReducer(leaderboard = [], action = {}) {
    if (action.type === "LEADERBOARD_CREATE") {
        return {
            ...leaderboard,
            leaderboard: action.payload
        };
    }
    return leaderboard;
}

export {leaderboardReducer}