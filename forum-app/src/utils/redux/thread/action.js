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

export {actionThread, actionSingleThread}