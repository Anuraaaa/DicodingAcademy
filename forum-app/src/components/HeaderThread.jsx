import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { actionFilterThread } from '../utils/redux/thread/action'

function HeaderThread ({ threads }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const dispatch = useDispatch()

  const filterCategory = (category) => {
    if (selectedCategory === category) {
      dispatch(actionFilterThread(threads))
      setSelectedCategory(null)
    } else {
      const filtered = threads.filter(thread => thread.category === category)
      dispatch(actionFilterThread(filtered))
      setSelectedCategory(category)
    }
  }

  return (
    <div className='flex flex-col p-4 gap-4'>
      <h1>Kategori Populer</h1>
      <div className='flex gap-4'>
        {threads?.slice(0, 3).map((thread, i) => (
          <button
            key={i}
            onClick={() => filterCategory(thread.category)}
            className={`border border-dashed border-gray-500 rounded w-[10%] text-center text-sm ${selectedCategory === thread.category ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          >
            <p>{thread.category}</p>
          </button>
        ))}
      </div>
      <h1 className='font-bold text-xl'>Diskusi Tersedia</h1>
    </div>
  )
}

HeaderThread.propTypes = {
  threads: PropTypes.array.isRequired
}

export default HeaderThread
