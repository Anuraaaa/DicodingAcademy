import PropTypes from 'prop-types';
import { formatDate, parseHTML } from '../utils/formatter';

function Comment({name, comment, avatar, createdAt, likes, dislikes}) {
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
                    <span className="material-symbols-outlined">thumb_up</span>
                    <span>{likes.length}</span>
                </button>                        
                <button className="flex gap-2 items-center">
                    <span className="material-symbols-outlined">thumb_down</span>
                    <span>{dislikes.length}</span>
                </button>                        
            </div>
        </div>
    )
}

Comment.propTypes = {
    name: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    dislikes: PropTypes.array.isRequired    
}

export default Comment;