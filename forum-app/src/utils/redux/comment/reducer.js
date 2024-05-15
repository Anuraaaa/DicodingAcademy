function commentReducer(comment = [], action = {}) {
    if (action.type === "COMMENT_CREATE") {
        return {
            ...comment,
            comment: action.payload
        };
    }
    if (action.type === "UP_VOTE_COMMENT") {
        const updateComment = comment.comments?.map(commentData => {
            if (commentData.id === action.payload.vote.commentId) {
                return {
                    ...commentData,
                    upVotesBy: [
                        ...commentData.upVotesBy,
                        action.payload.vote.userId
                    ]
                };
            }
            return commentData;
        });
        return {
            ...comment,
            comment: updateComment
        };    
    }
    if (action.type === "DOWN_VOTE_COMMENT") {
        const updateComment = comment.comments?.map((commentData) => {
            if (commentData.id === action.payload.vote.commentId) {
                return {
                    ...commentData,
                    downVotesBy: [
                        ...commentData.downVotesBy,
                        action.payload.vote.userId
                    ]
                };
            }
            return commentData;
        });
        return {
            ...comment,
            comment: updateComment
        };    
    }
    if (action.type === "NEUTRAL_VOTE_COMMENT") {
        const updateComment = comment.comments?.map((commentData) => {
            if (commentData.id === action.payload.vote.commentId) {
                return {
                    ...commentData,
                    upVotesBy: commentData.upVotesBy.filter(vote => vote !== action.payload.vote.userId),
                    downVotesBy: commentData.downVotesBy.filter(vote => vote !== action.payload.vote.userId)
                };
            }
            return updateComment;
        })        
        return {
            ...comment,
            comment: updateComment
        }
    }
    return comment;
}

export {commentReducer}