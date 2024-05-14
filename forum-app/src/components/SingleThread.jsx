import { useParams } from "react-router";
import Comment from "./Comment";
import Header from "./Header";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { createComment, dislikeThread, getAllUser, getThreadById, getUserLoggedIn, likeThread, neutralLikeThread } from "../utils/data";
import { formatDate, parseHTML } from "../utils/formatter";
import { useDispatch, useSelector } from "react-redux";
import { actionDownVoteSingleThread, actionNeutralVoteSingleThread, actionSingleThread, actionUpVoteSingleThread } from "../utils/redux/thread/action";
import { actionComment } from "../utils/redux/comment/action";
import useInput from "./UseInput";
import { showToast } from "../utils/toast";

function SingleThread() {
    const { threadId } = useParams();
    const [users, setUsers] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState([]);
    const auth = useSelector((state) => state.auth);
    const isAuthenticate = auth?.isAuth;
    const dispatch = useDispatch();

    
    useEffect(() => {
        async function fetchThread(threadId) {
            const {data} = await getThreadById(threadId);
            dispatch(actionSingleThread(data.detailThread));
            dispatch(actionComment(data.detailThread.comments));
        }
        async function fetchUser() {
            const {data} = await getAllUser();
            setUsers(data.users);
        }
        async function fetchUserLoggedIn() {
            const user = await getUserLoggedIn();
            setUserLoggedIn(user.data.user);
        }
        fetchThread(threadId);
        fetchUser();
        fetchUserLoggedIn();
    }, [threadId, dispatch, users])
    
    const thread = useSelector((state) => state.detailThread);
    const filterUser = users?.filter((data) => data.id == thread?.detailThread?.owner?.id);
    const comments = useSelector((state) => state.comment);
    const [valueComment, onCommentChange] = useInput('');

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        if (valueComment.length === 0)
            return showToast("Gagal menambahkan komentar! komentar tidak ada", "white", "red");

        if (valueComment.length > 64)
            return showToast("Gagal menambahkan komentar! komentar maksimal 64 karakter", "white", "red");

        const {error, message} = await createComment({threadId: threadId, content: valueComment});
        if (error)
            return showToast(`Gagal menambahkan komentar! ${message}`);

        showToast("Berhasil menambahkan komentar!", "white", "green");
        // dispatch(actionComment(data));
    }

    const hasUpVote = thread.detailThread?.upVotesBy.find(data => data == userLoggedIn.id);
    const hasDownVote = thread.detailThread?.downVotesBy.find(data => data == userLoggedIn.id);
    const upVoteHandle = async() => {
        let hasVote = false;
        thread.detailThread?.upVotesBy.map((data) => {
            if (userLoggedIn.id === data) {
                hasVote = true;
            }
        })
        thread.detailThread?.downVotesBy.map((data) => {
            if (userLoggedIn.id === data) {
                hasVote = true;
            }
        })
        if (!hasVote) {            
            const {error, message, data} = await likeThread({threadId: thread.detailThread?.id});
            if (error)
                return showToast(`Gagal up vote thread! ${message}`, "white", "red");
    
            dispatch(actionUpVoteSingleThread(data));
        }
        else {
            const {error, message, data} = await neutralLikeThread({threadId: thread.detailThread?.id});
            if (error)
                return showToast(`Gagal neutral vote thread! ${message}`, "white", "red");
            
            dispatch(actionNeutralVoteSingleThread(data));
        }        
    }

    const downVoteHandle = async() => {
        let hasVote = false;
        thread.detailThread?.upVotesBy.map((data) => {
            if (userLoggedIn.id === data) {
                hasVote = true;
            }
        })
        thread.detailThread?.downVotesBy.map((data) => {
            if (userLoggedIn.id === data) {
                hasVote = true;
            }
        })
        if (!hasVote) {            
            const {error, message, data} = await dislikeThread({threadId: thread.detailThread?.id});
            if (error)
                return showToast(`Gagal down vote thread! ${message}`, "white", "red");
    
            dispatch(actionDownVoteSingleThread(data));
        }
        else {
            const {error, message, data} = await neutralLikeThread({threadId: thread.detailThread?.id});
            if (error)
                return showToast(`Gagal neutral vote thread! ${message}`, "white", "red");
            
            dispatch(actionNeutralVoteSingleThread(data));
        }        
    }

    return(
        <>
            <Header/>
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 border-b-1 border-b-gray-200 p-8 shadow-lg mt-4 mb-32">
                    <div className="border border-dashed border-gray-500 rounded w-[10%] text-center text-sm">
                        <p>{thread?.detailThread?.category}</p>
                    </div>
                    <h1 className="font-bold text-2xl">{thread?.detailThread?.title}</h1>
                    <p className="text-md">{parseHTML(thread?.detailThread?.body)}</p>
                    <div className="flex flex-row gap-4 items-center text-sm">
                        <button className="flex gap-2 items-center">
                            <span className="material-symbols-outlined" onClick={upVoteHandle} style={{ color: `${hasUpVote? "blue" : "black"}` }}>thumb_up</span>
                            <span>{thread?.detailThread?.upVotesBy?.length}</span>
                        </button>                        
                        <button className="flex gap-2 items-center">
                            <span className="material-symbols-outlined" onClick={downVoteHandle} style={{ color: `${hasDownVote? "red" : "black"}` }}>thumb_down</span>
                            <span>{thread?.detailThread?.downVotesBy?.length}</span>
                        </button>                        
                        <p>{formatDate(thread?.detailThread?.createdAt)}</p>
                        <div className="flex items-center gap-2">                            
                            <img src={filterUser[0]?.avatar} alt={filterUser[0]?.name} className="w-5 rounded-full"/>
                            <p>Dibuat oleh {filterUser[0]?.name}</p>
                        </div>
                    </div>
                    {isAuthenticate &&
                        <>                        
                            <form className="flex flex-col gap-4" onSubmit={handleCommentSubmit}>
                                <h1 className="font-semibold">Beri Komentar</h1>
                                <textarea id="comment" className="h-32 w-full p-2 border border-gray-500 rounded resize-none" value={valueComment} onChange={onCommentChange}></textarea>
                                <button className="bg-gray-700 text-white p-2 rounded">Kirim</button>
                            </form>
                        </>
                    }
                    <h1 className="font-semibold">Komentar ({comments?.comment?.length})</h1>
                    {comments?.comment?.map((data, i) => {
                        return <Comment key={i} name={data.owner.name} comment={parseHTML(data.content)} avatar={data.owner.avatar} createdAt={data.createdAt} likes={data.upVotesBy} dislikes={data.downVotesBy}/>
                    })}
                </div>
            </div>
            <Navigation/>
        </>
    )
}

export default SingleThread;