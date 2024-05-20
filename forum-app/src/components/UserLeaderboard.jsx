// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'

function UserLeaderboard ({ name, score, avatar }) {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2 justify-center'>
        <img src={avatar} alt={name} className='w-10 rounded-full' />
        <h1>{name}</h1>
      </div>
      <p>{score}</p>
    </div>
  )
}

UserLeaderboard.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired
}

export default UserLeaderboard
