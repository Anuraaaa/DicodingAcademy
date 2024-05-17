function userReducer(user = [], action = {}) {
    if (action.type === "USER_CREATE") {
        return {
            ...user,
            user: action.payload
        };
    }
    return user;
}

function userLoggedInReducer(userLoggedIn = [], action = {}) {
    if (action.type === "USER_LOGGED_IN_CREATE") {
        return {
            ...userLoggedIn,
            userLoggedIn: action.payload
        };
    }
    return userLoggedIn;
}

export {userReducer, userLoggedInReducer}