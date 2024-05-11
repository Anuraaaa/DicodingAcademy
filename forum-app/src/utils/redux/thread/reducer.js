function threadReducer(thread = [], action = {}) {
    if (action.type === "THREAD_CREATE") {
        return {
            ...thread,
            thread: action.payload
        };
    }
    return thread;
}

function singleThreadReducer(detailThread = [], action = {}) {
    if (action.type === "SINGLE_THREAD_CREATE") {
        return {
            ...detailThread,
            detailThread: action.payload
        };
    }
    return detailThread;
}

export {threadReducer, singleThreadReducer}