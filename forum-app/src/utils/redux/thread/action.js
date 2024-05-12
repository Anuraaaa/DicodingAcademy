function actionThread(data) {
    return {
        type: 'THREAD_CREATE',
        payload: data
    }
}

function actionSingleThread(data) {
    return {
        type: 'SINGLE_THREAD_CREATE',
        payload: data
    }
}

function actionUpVoteThread(data) {
    // 
    return {
        type: 'THREAD_LIKE',
        payload: data 
    }
}

function actionDownVoteThread(threadId, users) {
    return {
        type: 'DOWN_VOTE_THREAD',
        payload: {
            threadId: threadId,
            users: users
        } 
    }
}

function actionNeutralVoteThread(threadId, users) {
    return {
        type: 'NEUTRAL_VOTE_THREAD',
        payload: {
            threadId: threadId,
            users: users
        } 
    }
}

export {actionThread, actionSingleThread, actionUpVoteThread, actionDownVoteThread, actionNeutralVoteThread}