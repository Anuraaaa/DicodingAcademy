import { getAllUser, getUserLoggedIn } from "../../data";

function actionGetUser() {
    return async (dispatch) => {
        try {
            const {data} = await getAllUser();
            dispatch(actionUser(data.users));    
        } catch (error) {
            console.log(error);
        }
    }
}

function actionGetUserLoggedIn() {
    return async (dispatch) => {
        try {
            const user = await getUserLoggedIn();
            dispatch(actionUserLoggedIn(user.data.user));
        } catch (error) {
            console.log(error);
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