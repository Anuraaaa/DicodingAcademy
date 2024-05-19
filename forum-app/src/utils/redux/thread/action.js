import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { getAllThread, getThreadById } from '../../data'
import { actionLoading } from '../loading/action'

function actionFetchThread () {
  return async (dispatch) => {
    dispatch(showLoading())
    dispatch(actionLoading(true))
    try {
      const { data } = await getAllThread()
      dispatch(actionThread(data.threads))
      dispatch(actionFilterThread(data.threads))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(hideLoading())
      dispatch(actionLoading(false))
    }
  }
}

function actionFetchSingleThread (threadId) {
  return async (dispatch) => {
    dispatch(showLoading())
    dispatch(actionLoading(true))
    try {
      const { data } = await getThreadById(threadId)
      dispatch(actionSingleThread(data.detailThread))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(hideLoading())
      dispatch(actionLoading(false))
    }
  }
}

function actionThread (data) {
  return {
    type: 'THREAD_CREATE',
    payload: data
  }
}

function actionFilterThread (data) {
  return {
    type: 'THREAD_FILTER',
    payload: data
  }
}

function actionSingleThread (data) {
  return {
    type: 'SINGLE_THREAD_CREATE',
    payload: data
  }
}

function actionUpVoteThread (data) {
  return {
    type: 'UP_VOTE_THREAD',
    payload: data
  }
}

function actionDownVoteThread (data) {
  return {
    type: 'DOWN_VOTE_THREAD',
    payload: data
  }
}

function actionNeutralVoteThread (data) {
  return {
    type: 'NEUTRAL_VOTE_THREAD',
    payload: data
  }
}

function actionUpVoteSingleThread (data) {
  return {
    type: 'UP_VOTE_SINGLE_THREAD',
    payload: data
  }
}

function actionDownVoteSingleThread (data) {
  return {
    type: 'DOWN_VOTE_SINGLE_THREAD',
    payload: data
  }
}

function actionNeutralVoteSingleThread (data) {
  return {
    type: 'NEUTRAL_VOTE_SINGLE_THREAD',
    payload: data
  }
}

function actionComment (data) {
  return {
    type: 'COMMENT_CREATE',
    payload: data
  }
}

function actionUpVoteComment (data) {
  return {
    type: 'UP_VOTE_COMMENT',
    payload: data
  }
}

function actionDownVoteComment (data) {
  return {
    type: 'DOWN_VOTE_COMMENT',
    payload: data
  }
}

function actionNeutralVoteComment (data) {
  return {
    type: 'NEUTRAL_VOTE_COMMENT',
    payload: data
  }
}

export {
  actionThread,
  actionFilterThread,
  actionFetchThread,
  actionFetchSingleThread,
  actionSingleThread,
  actionUpVoteThread,
  actionDownVoteThread,
  actionNeutralVoteThread,
  actionUpVoteSingleThread,
  actionDownVoteSingleThread,
  actionNeutralVoteSingleThread,
  actionComment,
  actionUpVoteComment,
  actionDownVoteComment,
  actionNeutralVoteComment
}
