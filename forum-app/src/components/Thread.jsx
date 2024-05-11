import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDate, parseHTML } from "../utils/formatter";
import { useEffect, useState } from "react";
import { getAllUser, likeThread, neutralLikeThread } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { actionDownVoteThread, actionNeutralVoteThread, actionUpVoteThread } from "../utils/redux/thread/action";
import { showToast } from "../utils/toast";

function Thread({title, body, category, createdAt, totalComments, likes, dislikes, ownerId, id}) {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        async function getUsers() {
            const {data} = await getAllUser();
            setUsers(data.users);
        }
        function fetchVote() {
            if (likes.length > 0)
                dispatch(actionUpVoteThread(id, likes));
            
            if (dislikes.length > 0)
                dispatch(actionDownVoteThread(id, dislikes));

            if (likes.length == 0 && dislikes.length == 0)
                dispatch(actionNeutralVoteThread(id, null));
        }
        getUsers();
        fetchVote();
    }, [users, likes, dislikes, id, dispatch])

    const voteThread = useSelector((state) => state.voteThread);
    
    const filterUser = users?.filter((data) => data.id == ownerId);

    const upVoteHandle = async() => {
        if (voteThread.voteThread.threadId == id && voteThread.type == 0) {
            const {error, message, data} = await likeThread({threadId: id});
            if (error)
                return showToast(`Gagal like thread! ${message}`, "white", "red");
    
            dispatch(actionUpVoteThread(id, data.userId));
        }
        else if (voteThread.voteThread.threadId == id && voteThread.type == 1 || voteThread.type == -1) {
            const {error, message, data} = await neutralLikeThread({threadId: id});
            if (error)
                return showToast(`Gagal neutral like thread! ${message}`, "white", "red");
    
            dispatch(actionNeutralVoteThread(id, data.userId));
        }
    }

    const downVoteHandle = async() => {
        if (voteThread.voteThread.threadId == id && voteThread.type == 0) {
            const {error, message, data} = await likeThread({threadId: id});
            if (error)
                return showToast(`Gagal dislike thread! ${message}`, "white", "red");
    
            dispatch(actionDownVoteThread(id, data.userId));
        }
        else if (voteThread.voteThread.threadId == id && voteThread.type == 1 || voteThread.type == -1) {
            const {error, message, data} = await neutralLikeThread({threadId: id});
            if (error)
                return showToast(`Gagal neutral like thread! ${message}`, "white", "red");
    
            dispatch(actionNeutralVoteThread(id, data.userId));
        }
    }
    
    return (
        <>
            <div className="flex flex-col gap-4 border-b-1 border-b-gray-200 p-4 shadow-lg">
                <div className="border border-dashed border-gray-500 rounded w-[10%] text-center text-sm">
                    <p>{category}</p>
                </div>
                <h1 className="font-bold text-xl"><Link to={`/single-thread/${id}`}>{title}</Link></h1>
                <p className="text-md"><Link to={`/single-thread/${id}`}>{parseHTML(body)}</Link></p>
                <div className="flex flex-row gap-4 items-center text-sm">
                    <button className="flex gap-2 items-center" onClick={upVoteHandle}>
                        <span className="material-symbols-outlined">thumb_up</span>
                        <span>{likes.length}</span>
                    </button>                        
                    <button className="flex gap-2 items-center" onClick={downVoteHandle}>
                        <span className="material-symbols-outlined">thumb_down</span>
                        <span>{dislikes.length}</span>
                    </button>                        
                    <button className="flex gap-2 items-center">
                        <span className="material-symbols-outlined">comment</span>
                        <span>{totalComments}x</span>
                    </button>                        
                    <p>{formatDate(createdAt)}</p>
                    <p>Dibuat oleh {filterUser[0]?.name}</p>
                </div>
            </div>
        </>
    )
}

Thread.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    likes: PropTypes.array.isRequired,
    dislikes: PropTypes.array.isRequired,
    ownerId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default Thread;