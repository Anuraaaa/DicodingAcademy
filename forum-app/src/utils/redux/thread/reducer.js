function threadReducer(thread = [], action = {}) {
    if (action.type === "THREAD_CREATE") {
        return {
            ...thread,
            thread: action.payload
        };
    }
    if (action.type === "THREAD_LIKE") {
        // 
        const threadData = thread.thread.find((data) => data.id == action.payload.vote.threadId);
        return {
            ...threadData,
            upVotesBy: [
                ...threadData.upVotesBy,
                action.payload.vote.userId
            ]
        }
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

function voteThreadReducer(voteThread = [], action = {}) {
    if (action.type === "UP_VOTE_THREAD") {
        return {
            ...voteThread,
            type: 1,
            voteThread: action.payload
        }
    }
    if (action.type === "DOWN_VOTE_THREAD") {
        return {
            ...voteThread,
            type: -1,
            voteThread: action.payload
        }
    }
    if (action.type === "NEUTRAL_VOTE_THREAD") {
        return {
            ...voteThread,
            type: 0,
            voteThread: action.payload
        }        
    }
    return voteThread;
}

export {threadReducer, singleThreadReducer, voteThreadReducer}