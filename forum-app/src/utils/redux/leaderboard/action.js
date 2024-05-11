function actionLeaderboard(data) {
    return {
        type: 'LEADERBOARD_CREATE',
        payload: data
    }
}

export {actionLeaderboard}