import { authReducer } from "./auth/reducer";
import { commentReducer } from "./comment/reducer";
import { leaderboardReducer } from "./leaderboard/reducer";
import { singleThreadReducer, threadFilterReducer, threadReducer } from "./thread/reducer";

function rootReducer(state = {}, action = {}) {
    return {
        auth: authReducer(state.auth, action),
        thread: threadReducer(state.thread, action),
        filteredThread: threadFilterReducer(state.filteredThread, action),
        detailThread: singleThreadReducer(state.detailThread, action),
        comment: commentReducer(state.comment, action),
        leaderboard: leaderboardReducer(state.leaderboard, action)
    }
}

export default rootReducer;