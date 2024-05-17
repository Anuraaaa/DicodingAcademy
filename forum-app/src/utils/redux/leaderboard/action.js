import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getLeaderboards } from "../../data";
import { actionLoading } from "../loading/action";

function actionFetchLeaderboard() {
    return async (dispatch) => {
        dispatch(showLoading());
        dispatch(actionLoading(true));
        try {
            const {data} = await getLeaderboards();
            dispatch(actionLeaderboard(data.leaderboards));                
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(hideLoading());
            dispatch(actionLoading(false));
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