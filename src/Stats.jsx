import React from 'react'
import { useNavigate } from 'react-router-dom';

const Stats = ({ score, clearScore }) => {
    const navigate = useNavigate();
  return (
    <div>
      <h1>Game Statistics</h1>
      <p>Wins: {score.wins}</p>
      <p>Losses: {score.losses}</p>
      <p>Draws: {score.draws}</p>
      <button onClick={clearScore} className='stats-btn'>Clear Score 🗑️</button>
      <button onClick={() => navigate('/')} className='stats-btn'>Back to Game 🎮</button>
    </div>
  )
}

export default Stats
