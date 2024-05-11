function commentReducer(comment = [], action = {}) {
    if (action.type === "COMMENT_CREATE") {
        return {
            ...comment,
            comment: action.payload
        };
    }
    return comment;
}

export {commentReducer}