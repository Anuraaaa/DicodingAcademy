import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getAllUser, getUserLoggedIn } from "../../data";
import { actionLoading } from "../loading/action";

function actionGetUser() {
    return async (dispatch) => {
        dispatch(showLoading());
        dispatch(actionLoading(true));
        try {
            const {data} = await getAllUser();
            dispatch(actionUser(data.users));    
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(hideLoading());
            dispatch(actionLoading(false));
        }
    }
}

function actionGetUserLoggedIn() {
    return async (dispatch) => {
        dispatch(showLoading());
        dispatch(actionLoading(true));
        try {
            const user = await getUserLoggedIn();
            dispatch(actionUserLoggedIn(user.data.user));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(hideLoading());
            dispatch(actionLoading(false));
        }
    }
}

function actionUser(data) {
    return  {
        type: "USER_CREATE",
        payload: data
    }
}

function actionUserLoggedIn(data) {
    return  {
        type: "USER_LOGGED_IN_CREATE",
        payload: data
    }
}

export {
    actionGetUser,
    actionUser,
    actionGetUserLoggedIn,
    actionUserLoggedIn
}