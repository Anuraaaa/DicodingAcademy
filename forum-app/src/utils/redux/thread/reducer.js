function threadReducer(thread = [], action = {}) {
    if (action.type === "THREAD_CREATE") {
        return {
            ...thread,
            thread: action.payload
        };
    }
    if (action.type === "UP_VOTE_THREAD") {
        const updatedThreads = thread.thread.map(threadData => {
            if (threadData.id === action.payload.vote.threadId) {
                return {
                    ...threadData,
                    upVotesBy: [
                        ...threadData.upVotesBy,
                        action.payload.vote.userId
                    ]
                };
            }
            return threadData;
        });
        return {
            ...thread,
            thread: updatedThreads
        };    
    }
    if (action.type === "DOWN_VOTE_THREAD") {
        const updatedThreads = thread.thread.map((data) => {
            if (data.id === action.payload.vote.threadId) {
                return {
                    ...data,
                    downVotesBy: [
                        ...data.downVotesBy,
                        action.payload.vote.userId
                    ]
                };
            }
            return data;
        });
        return {
            ...thread,
            thread: updatedThreads
        };    
    }
    if (action.type === "NEUTRAL_VOTE_THREAD") {
        const updatedThreads = thread.thread.map((data) => {
            if (data.id === action.payload.vote.threadId) {
                return {
                    ...data,
                    upVotesBy: data.upVotesBy.filter(vote => vote !== action.payload.vote.userId),
                    downVotesBy: data.downVotesBy.filter(vote => vote !== action.payload.vote.userId)
                };
            }
            return data;
        })        
        return {
            ...thread,
            thread: updatedThreads
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

export {threadReducer, singleThreadReducer}