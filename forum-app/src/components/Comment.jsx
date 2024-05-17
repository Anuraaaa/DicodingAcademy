import PropTypes from 'prop-types';
import { formatDate, parseHTML } from '../utils/formatter';
import { dislikeComment, likeComment, neutralLikeComment } from '../utils/data';
import { showToast } from '../utils/toast';
import { useDispatch } from 'react-redux';
import { actionDownVoteComment, actionNeutralVoteComment, actionUpVoteComment } from '../utils/redux/thread/action';

function Comment({name, id, threadId, comment, avatar, createdAt, likes, dislikes, userLoggedIn}) {
    const dispatch = useDispatch();

    const hasUpVote = likes.find(data => data == userLoggedIn.id);
    const hasDownVote = dislikes.find(data => data == userLoggedIn.id);

    const upVoteHandle = async() => {
        let hasVote = false;
        likes.map((data) => {
            if (userLoggedIn.id === data) {
                hasVote = true;
            }
        })
        dislikes.map((data) => {
            if (userLoggedIn.id === data) {
                hasVote = true;
            }
        })
        if (!hasVote) {            
            const {error, message, data} = await likeComment({threadId: threadId, commentId: id});
            if (error)
                return showToast(`Gagal up vote comment! ${message}`, "white", "red");
    
            dispatch(actionUpVoteComment(data));
        }
        else {
            const {error, message, data} = await neutralLikeComment({threadId: threadId, commentId: id});
            if (error)
                return showToast(`Gagal neutral vote comment! ${message}`, "white", "red");
            
            dispatch(actionNeutralVoteComment(data));
        }        
    }

    const downVoteHandle = async() => {
        let hasVote = false;
        likes.map((data) => {
            if (userLoggedIn.id === data) {
                hasVote = true;
            }
        })
        dislikes.map((data) => {
            if (userLoggedIn.id === data) {
                hasVote = true;
            }
        })
        if (!hasVote) {            
            const {error, message, data} = await dislikeComment({threadId: threadId, commentId: id});
            if (error)
                return showToast(`Gagal down vote comment! ${message}`, "white", "red");
    
            dispatch(actionDownVoteComment(data));
        }
        else {
            const {error, message, data} = await neutralLikeComment({threadId: threadId, commentId: id});
            if (error)
                return showToast(`Gagal neutral vote comment! ${message}`, "white", "red");
            
            dispatch(actionNeutralVoteComment(data));
        }        
    }

    return (
        <div className="flex flex-col border-b-2 border-b-gray-200 gap-4 p-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <img src={avatar} alt={name} className='w-5 rounded-full' />
                    <h1>{name}</h1>
                </div>
                <p>{formatDate(createdAt)}</p>
            </div>
            <p>{parseHTML(comment)}</p>
            <div className="flex flex-row gap-4 items-center text-sm">
                <button className="flex gap-2 items-center">
                    <span className="material-symbols-outlined" onClick={upVoteHandle} style={{ color: `${hasUpVote? "blue" : "black"}` }}>thumb_up</span>
                    <span>{likes.length}</span>
                </button>                        
                <button className="flex gap-2 items-center">
                    <span className="material-symbols-outlined" onClick={downVoteHandle} style={{ color: `${hasDownVote? "red" : "black"}` }}>thumb_down</span>
                    <span>{dislikes.length}</span>
                </button>                        
            </div>
        </div>
    )
}

Comment.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    threadId: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    dislikes: PropTypes.array.isRequired,
    userLoggedIn: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    })    
}

export default Comment;