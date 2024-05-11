import { authReducer } from "./auth/reducer";
import { commentReducer } from "./comment/reducer";
import { leaderboardReducer } from "./leaderboard/reducer";
import { singleThreadReducer, threadReducer, voteThreadReducer } from "./thread/reducer";

function rootReducer(state = {}, action = {}) {
    return {
        auth: authReducer(state.auth, action),
        thread: threadReducer(state.thread, action),
        detailThread: singleThreadReducer(state.detailThread, action),
        comment: commentReducer(state.comment, action),
        leaderboard: leaderboardReducer(state.leaderboard, action),
        voteThread: voteThreadReducer(state.voteThread, action)
    }
}

export default rootReducer;