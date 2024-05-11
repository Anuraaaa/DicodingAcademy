function actionComment(data) {
    return {
        type: 'COMMENT_CREATE',
        payload: data
    }
}

export {actionComment}