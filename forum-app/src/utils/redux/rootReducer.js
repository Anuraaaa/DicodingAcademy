import { loadingBarReducer } from "react-redux-loading-bar";
import { authReducer } from "./auth/reducer";
import { leaderboardReducer } from "./leaderboard/reducer";
import { loadingReducer } from "./loading/reducer";
import { singleThreadReducer, threadFilterReducer, threadReducer } from "./thread/reducer";
import { userLoggedInReducer, userReducer } from "./user/reducer";

function rootReducer(state = {}, action = {}) {
    return {
        auth: authReducer(state.auth, action),
        thread: threadReducer(state.thread, action),
        filteredThread: threadFilterReducer(state.filteredThread, action),
        detailThread: singleThreadReducer(state.detailThread, action),
        leaderboard: leaderboardReducer(state.leaderboard, action),
        user: userReducer(state.user, action),
        userLoggedIn: userLoggedInReducer(state.userLoggedIn, action),
        loading: loadingReducer(state.loading, action),
        loadingBar: loadingBarReducer
    }
}

export default rootReducer;