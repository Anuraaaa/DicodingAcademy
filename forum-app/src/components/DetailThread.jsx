// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment, dislikeThread, likeThread, neutralLikeThread } from '../utils/data'
import { formatDate, parseHTML } from '../utils/formatter'
import { actionComment, actionDownVoteSingleThread, actionNeutralVoteSingleThread, actionUpVoteSingleThread } from '../utils/redux/thread/action'
import { showToast } from '../utils/toast'
import Comment from './Comment'
import { Skeleton } from './ui/skeleton'
import useInput from './UseInput'
import PropTypes from 'prop-types'

function DetailThread ({ threadId, loading, thread, users, userLoggedIn, isAuthenticate }) {
  const dispatch = useDispatch()
  const [valueComment, onCommentChange] = useInput('')
  const filterUser = users?.filter((data) => data.id === thread?.owner?.id)
  const handleCommentSubmit = async (event) => {
    event.preventDefault()

    if (valueComment.length === 0) { return showToast('Gagal menambahkan komentar! komentar tidak ada', 'white', 'red') }

    if (valueComment.length > 64) { return showToast('Gagal menambahkan komentar! komentar maksimal 64 karakter', 'white', 'red') }

    const { error, message, data } = await createComment({ threadId, content: valueComment })
    if (error) { return showToast(`Gagal menambahkan komentar! ${message}`) }

    showToast('Berhasil menambahkan komentar!', 'white', 'green')
    dispatch(actionComment(data))
  }

  const hasUpVote = thread?.upVotesBy?.find(data => data === userLoggedIn?.id)
  const hasDownVote = thread?.downVotesBy?.find(data => data === userLoggedIn?.id)
  const upVoteHandle = async () => {
    const hasVote = thread?.upVotesBy?.some((data) => userLoggedIn?.id === data) ||
    thread?.downVotesBy?.some((data) => userLoggedIn?.id === data)
    if (!hasVote) {
      const { error, message, data } = await likeThread({ threadId: thread?.id })
      if (error) {
        return showToast(`Gagal up vote single thread! ${message}`, 'white', 'red')
      }

      dispatch(actionUpVoteSingleThread(data))
    } else {
      const { error, message, data } = await neutralLikeThread({ threadId: thread?.id })
      if (error) {
        return showToast(`Gagal neutral vote single thread! ${message}`, 'white', 'red')
      }

      dispatch(actionNeutralVoteSingleThread(data))
    }
  }

  const downVoteHandle = async () => {
    const hasVote = thread?.upVotesBy?.some((data) => userLoggedIn?.id === data) ||
    thread?.downVotesBy?.some((data) => userLoggedIn?.id === data)
    if (!hasVote) {
      const { error, message, data } = await dislikeThread({ threadId: thread?.id })
      if (error) {
        return showToast(`Gagal down vote single thread! ${message}`, 'white', 'red')
      }

      dispatch(actionDownVoteSingleThread(data))
    } else {
      const { error, message, data } = await neutralLikeThread({ threadId: thread?.id })
      if (error) {
        return showToast(`Gagal neutral vote single thread! ${message}`, 'white', 'red')
      }

      dispatch(actionNeutralVoteSingleThread(data))
    }
  }

  return (
    <>
      {loading
        ? <Skeleton className='h-[16px] w-full rounded-full' />
        : <div className='border border-dashed border-gray-500 rounded w-[10%] text-center text-sm'>
          <p>{thread?.category}</p>
        </div>}
      {loading ? <Skeleton className='h-[24px] w-full rounded-full' /> : <h1 className='font-bold text-2xl'>{thread?.title}</h1>}
      {loading ? <Skeleton className='h-[64px] w-full rounded-full' /> : <p className='text-md'>{parseHTML(thread?.body)}</p>}
      <div className='flex flex-row gap-4 items-center text-sm'>
        {loading
          ? <Skeleton className='h-[16px] w-full rounded-full' />
          : <>
            <button className='flex gap-2 items-center'>
              <span className='material-symbols-outlined' onClick={upVoteHandle} style={{ color: `${hasUpVote ? 'blue' : 'black'}` }}>thumb_up</span>
              <span>{thread?.upVotesBy?.length}</span>
            </button>
            <button className='flex gap-2 items-center'>
              <span className='material-symbols-outlined' onClick={downVoteHandle} style={{ color: `${hasDownVote ? 'red' : 'black'}` }}>thumb_down</span>
              <span>{thread?.downVotesBy?.length}</span>
            </button>
            <p>{formatDate(thread?.createdAt)}</p>
            <div className='flex items-center gap-2'>
              <img src={filterUser[0]?.avatar} alt={filterUser[0]?.name} className='w-5 rounded-full' />
              <p>Dibuat oleh {filterUser[0]?.name}</p>
            </div>
            </>}
      </div>
      {isAuthenticate &&
        <>
          <form className='flex flex-col gap-4' onSubmit={handleCommentSubmit}>
            <h1 className='font-semibold'>Beri Komentar</h1>
            {loading
              ? <>
                <Skeleton className='h-32 w-full rounded-xl' />
                <Skeleton className='h-[16px] w-full rounded-xl' />
                </>
              : <>
                <textarea id='comment' className='h-32 w-full p-2 border border-gray-500 rounded resize-none' value={valueComment} onChange={onCommentChange} />
                <button className='bg-gray-700 text-white p-2 rounded'>Kirim</button>
                </>}
          </form>
        </>}
      <h1 className='font-semibold'>Komentar ({thread?.comments?.length})</h1>

      {loading
        ? <div className='flex flex-col gap-4'>
          {
                        Array.from({ length: 5 }).map((_, index) => (
                          <div key={index} className='flex flex-col gap-2'>
                            <Skeleton className='h-[16px] w-[10%] rounded-xl' />
                            <Skeleton className='h-[24px] w-full rounded-xl' />
                            <Skeleton className='h-[16px] w-full rounded-xl' />
                          </div>
                        ))
                    }
        </div>
        : thread?.comments?.map((data, i) => {
          return <Comment key={i} name={data.owner.name} id={data.id} threadId={thread?.id} comment={parseHTML(data.content)} avatar={data.owner.avatar} createdAt={data.createdAt} likes={data.upVotesBy} dislikes={data.downVotesBy} userLoggedIn={userLoggedIn} />
        })}
    </>
  )
}

DetailThread.propTypes = {
  threadId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  thread: PropTypes.shape({
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    upVotesBy: PropTypes.array.isRequired,
    downVotesBy: PropTypes.array.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }),
    comments: PropTypes.array.isRequired
  }),
  users: PropTypes.array.isRequired,
  userLoggedIn: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
  isAuthenticate: PropTypes.bool.isRequired
}
export default DetailThread
