// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatDate, parseHTML, truncateString } from '../utils/formatter'
import { dislikeThread, likeThread, neutralLikeThread } from '../utils/data'
import { useDispatch } from 'react-redux'
import { actionDownVoteThread, actionNeutralVoteThread, actionUpVoteThread } from '../utils/redux/thread/action'
import { showToast } from '../utils/toast'

function Thread ({ title, body, category, createdAt, totalComments, likes, dislikes, ownerId, id, users, userLoggedIn }) {
  const dispatch = useDispatch()
  const filterUser = users.filter((data) => data.id === ownerId)
  const hasUpVote = likes.find(data => data === userLoggedIn?.id)
  const hasDownVote = dislikes.find(data => data === userLoggedIn?.id)

  const upVoteHandle = async () => {
    const hasVote = likes.some((data) => userLoggedIn.id === data) || dislikes.some((data) => userLoggedIn.id === data)
    if (!hasVote) {
      const { error, message, data } = await likeThread({ threadId: id })
      if (error) {
        return showToast(`Gagal up vote thread! ${message}`, 'white', 'red')
      }

      dispatch(actionUpVoteThread(data))
    } else {
      const { error, message, data } = await neutralLikeThread({ threadId: id })
      if (error) {
        return showToast(`Gagal neutral vote thread! ${message}`, 'white', 'red')
      }

      dispatch(actionNeutralVoteThread(data))
    }
  }

  const downVoteHandle = async () => {
    const hasVote = likes.some((data) => userLoggedIn.id === data) || dislikes.some((data) => userLoggedIn.id === data)
    if (!hasVote) {
      const { error, message, data } = await dislikeThread({ threadId: id })
      if (error) {
        return showToast(`Gagal down vote thread! ${message}`, 'white', 'red')
      }

      dispatch(actionDownVoteThread(data))
    } else {
      const { error, message, data } = await neutralLikeThread({ threadId: id })
      if (error) {
        return showToast(`Gagal neutral vote thread! ${message}`, 'white', 'red')
      }

      dispatch(actionNeutralVoteThread(data))
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4 border-b-1 border-b-gray-200 p-4 shadow-lg'>
        <div className='border border-dashed border-gray-500 rounded w-[10%] text-center text-sm'>
          <p>{category}</p>
        </div>
        <h1 className='font-bold text-xl'><Link to={`/single-thread/${id}`}>{title}</Link></h1>
        <p className='text-md'><Link to={`/single-thread/${id}`}>{parseHTML(truncateString(body, 200))}</Link></p>
        <div className='flex flex-row gap-4 items-center text-sm'>
          <button className='flex gap-2 items-center' onClick={upVoteHandle}>
            <span className='material-symbols-outlined' style={{ color: `${hasUpVote ? 'blue' : 'black'}` }}>thumb_up</span>
            <span>{likes.length}</span>
          </button>
          <button className='flex gap-2 items-center' onClick={downVoteHandle}>
            <span className='material-symbols-outlined' style={{ color: `${hasDownVote ? 'red' : 'black'}` }}>thumb_down</span>
            <span>{dislikes.length}</span>
          </button>
          <button className='flex gap-2 items-center'>
            <span className='material-symbols-outlined'>comment</span>
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
  id: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  userLoggedIn: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  })
}

export default Thread
