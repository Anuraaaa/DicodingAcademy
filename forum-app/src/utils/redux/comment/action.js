function actionComment(data) {
    return {
        type: 'COMMENT_CREATE',
        payload: data
    }
}

function actionUpVoteComment(data) {
    return {
        type: 'UP_VOTE_COMMENT',
        payload: data
    }
}

function actionDownVoteComment(data) {
    return {
        type: 'DOWN_VOTE_COMMENT',
        payload: data
    }
}

function actionNeutralVoteComment(data) {
    return {
        type: 'NEUTRAL_VOTE_COMMENT',
        payload: data
    }
}

export {
    actionComment,
    actionUpVoteComment,
    actionDownVoteComment,
    actionNeutralVoteComment
}