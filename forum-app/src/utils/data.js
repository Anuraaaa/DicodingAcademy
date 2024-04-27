const url = "https://forum-api.dicoding.dev/v1";

async function registerUser(name, email, password) {
    try {        
        const response = await fetch(`${url}/register`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        
        const result = await response.json();

        if (result.status != "success") {
            console.log("ERROR: endpoint register user return status failed");
            return false;
        }
        return result.data.user;
    } catch (error) {
        console.log(error);
    }
}

async function loginUser(email, password) {
    try {        
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        
        const result = await response.json();

        if (result.status != "success") {
            console.log("ERROR: endpoint login user return status failed");
            return false;
        }
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

async function getAllUser() {
    try {
        const response = await fetch(`${url}/users`);
        const result = await response.json();

        if (result.status != "success") {
            console.log("ERROR: endpoint get all user return status failed");
            return false;
        }
        return result.data.users;

    } catch (error) {
        console.log(error)
    }
}

async function getUserLoggedIn() {
    try {
        const response = await fetch(`${url}/users/me`, {
            headers: {
                "Authorization": `Bearer <token>`
            }
        });

        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint get user logged in return status failed");
            return false;
        }
        return result.data.user;
    } catch (error) {
        console.log(error)
    }
}

async function createThread(title, body, category) {
    try {
        const response = await fetch(`${url}/threads`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer <token>`
            },
            body: JSON.stringify({
                title: title,
                body: body,
                category: category
            })
        })
        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint create thread return status failed");
            return false;
        }
        return result.data.thread;
    } catch (error) {
        console.log(error)
    }
}

async function getAllThread() {
    try {
        const response = await fetch(`${url}/threads`);
        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint get all thread return status failed");
            return false;
        }
        return result.data.threads;        
    } catch (error) {
        console.log(error)
    }
}

async function getThreadById(threadId) {
    try {
        const response = await fetch(`${url}/threads/${threadId}`);
        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint get thread by id return status failed");
            return false;
        }
        return result.data.detailThread;        
    } catch (error) {
        console.log(error)
    }
}

async function createComment(threadId, content) {
    try {
        const response = await fetch(`${url}/threads/${threadId}/comments`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer <token>`                
            },
            body: JSON.stringify({
                content: content
            })
        })
        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint create comment return status failed");
            return false;
        }
        return result.data.comment;                
    } catch (error) {
        console.log(error)
    }
}

async function likeThread(threadId) {
    try {
        const response = await fetch(`${url}/threads/${threadId}/up-vote`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer <token>`                
            }
        })
        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint like thread return status failed");
            return false;
        }
        return result.data.vote;                
    } catch (error) {
        console.log(error)
    }
}

async function dislikeThread(threadId) {
    try {
        const response = await fetch(`${url}/threads/${threadId}/down-vote`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer <token>`                
            }
        })
        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint dislike thread return status failed");
            return false;
        }
        return result.data.vote;                
    } catch (error) {
        console.log(error)
    }
}

async function neutralLikeThread(threadId) {
    try {
        const response = await fetch(`${url}/threads/${threadId}/neutral-vote`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer <token>`                
            }
        })
        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint neutral like thread return status failed");
            return false;
        }
        return result.data.vote;                
    } catch (error) {
        console.log(error)
    }
}

async function likeComment(threadId, commentId) {
    try {
        const response = await fetch(`${url}/threads/${threadId}/comments/${commentId}/up-vote`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer <token>`                
            }
        })
        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint like comment return status failed");
            return false;
        }
        return result.data.vote;                
    } catch (error) {
        console.log(error)
    }
}

async function dislikeComment(threadId, commentId) {
    try {
        const response = await fetch(`${url}/threads/${threadId}/comments/${commentId}/down-vote`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer <token>`                
            }
        })
        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint dislike comment return status failed");
            return false;
        }
        return result.data.vote;                
    } catch (error) {
        console.log(error)
    }
}

async function neutralLikeComment(threadId, commentId) {
    try {
        const response = await fetch(`${url}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer <token>`                
            }
        })
        const result = await response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint neutral like return status failed");
            return false;
        }
        return result.data.vote;                
    } catch (error) {
        console.log(error)
    }
}

async function getLeaderboards() {
    try {
        const response = await fetch(`${url}/leaderboards`);
        const result = response.json();
        if (result.status != "success") {
            console.log("ERROR: endpoint get leaderboards return status failed");
            return false;
        }
        return result.data.leaderboards;                
    } catch (error) {
        console.log(error)
    }
}

export {
    registerUser,
    loginUser,
    getAllUser,
    getUserLoggedIn,
    createThread,
    getAllThread,
    getThreadById,
    createComment,
    likeThread,
    dislikeThread,
    neutralLikeThread,
    likeComment,
    dislikeComment,
    neutralLikeComment,
    getLeaderboards        
}
 