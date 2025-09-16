import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import './App.css'
import Stats from './Stats';

function App() {
  const navigate = useNavigate();
  const choices = [
    { name: 'Rock', emoji: '🪨' },
    { name: 'Paper', emoji: '📑' },
    { name: 'Scissors', emoji: '✂️' },
  ]
  const storedScore = JSON.parse(localStorage.getItem('rpsScore')) || { wins: 0, losses: 0, draws: 0 };
  const [score, setScore] = useState(storedScore);
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    // Save score to localStorage whenever it changes
    localStorage.setItem('rpsScore', JSON.stringify(score));
  }, [score]);

  const playGame = (choice) => {
    setUserChoice(choice)
    
    const randomChoice = choices[Math.floor(Math.random() * choices.length)].name;
    setComputerChoice(randomChoice);

    let res = '';
    if (choice === randomChoice) {
      res = 'Draw';
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else if (
      (choice === 'Rock' && randomChoice === 'Scissors') ||
      (choice === 'Paper' && randomChoice === 'Rock') ||
      (choice === 'Scissors' && randomChoice === 'Paper')
    ) {
      res = 'You Win!';
      setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      res = 'You Lose!';
      setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
    }

    setResult(res);
  };

  const clearScore = () => {
    setScore({ wins: 0, losses: 0, draws: 0 });
    localStorage.removeItem('rpsScore');
  }
  return (
    <Routes>
      <Route path='/' element={
        <div>
          <h1>Rock-Paper-Scissors</h1>
          <h2>Choose an option to play</h2>
          <div className="choices">
            {choices.map((choice) => (
              <button key={choice.name} onClick={() => playGame(choice.name)} className='choice-btn'>
                <span className="emoji">{choice.emoji}</span>
                <span className="label">{choice.name}</span>
              </button>
            ))}
          </div>

          <div>
            {userChoice && (
              <div className="result">
                  <p>You chose: {userChoice}</p>
                  <p>Computer chose: {computerChoice}</p>
                  <p>{result}</p>
              </div>

                )}
          </div>
          <button onClick={() => navigate('/stats')} className='stats-btn'>View Stats 📊</button>
        </div>
      } />
      <Route path="/stats" element={<Stats score={score} clearScore={clearScore}/>} />
    </Routes>
  )
}

export default App
