import { loadingBarReducer } from 'react-redux-loading-bar'
import { authReducer } from './auth/reducer'
import { leaderboardReducer } from './leaderboard/reducer'
import { loadingReducer } from './loading/reducer'
import { singleThreadReducer, threadFilterReducer, threadReducer } from './thread/reducer'
import { userLoggedInReducer, userReducer } from './user/reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  thread: threadReducer,
  filteredThread: threadFilterReducer,
  detailThread: singleThreadReducer,
  leaderboard: leaderboardReducer,
  user: userReducer,
  userLoggedIn: userLoggedInReducer,
  loading: loadingReducer,
  loadingBar: loadingBarReducer

})

export default rootReducer
