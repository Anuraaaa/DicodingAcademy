import { getLeaderboards } from "../../data";

function actionFetchLeaderboard() {
    return async (dispatch) => {
        try {
            const {data} = await getLeaderboards();
            dispatch(actionLeaderboard(data.leaderboards));                
        } catch (error) {
            console.log(error);
        }
    }
}

function actionLeaderboard(data) {
    return {
        type: 'LEADERBOARD_CREATE',
        payload: data
    }
}

export {actionFetchLeaderboard, actionLeaderboard}