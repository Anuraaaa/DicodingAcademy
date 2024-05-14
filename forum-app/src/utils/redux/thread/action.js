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
    return {
        type: 'UP_VOTE_THREAD',
        payload: data 
    }
}

function actionDownVoteThread(data) {
    return {
        type: 'DOWN_VOTE_THREAD',
        payload: data 
    }
}

function actionNeutralVoteThread(data) {
    return {
        type: 'NEUTRAL_VOTE_THREAD',
        payload: data 
    }
}

function actionUpVoteSingleThread(data) {
    return {
        type: 'UP_VOTE_SINGLE_THREAD',
        payload: data 
    }
}

function actionDownVoteSingleThread(data) {
    return {
        type: 'DOWN_VOTE_SINGLE_THREAD',
        payload: data 
    }
}

function actionNeutralVoteSingleThread(data) {
    return {
        type: 'NEUTRAL_VOTE_SINGLE_THREAD',
        payload: data 
    }
}


export {
    actionThread, 
    actionSingleThread, 
    actionUpVoteThread, 
    actionDownVoteThread, 
    actionNeutralVoteThread,
    actionUpVoteSingleThread,
    actionDownVoteSingleThread,
    actionNeutralVoteSingleThread
}