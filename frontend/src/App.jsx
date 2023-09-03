import { useEffect, useState } from 'react'
import './App.css'

import Deck from './components/Deck'


const difficultyData = [{
  name: 'easy',
  cards: 4,
}, {
  name: 'medium',
  cards: 8,
},
{
  name: 'hard',
  cards: 12,   
}]

const noHighScore = [
    {
      name: 'easy',
      flips: 0,
      time: {
        minutes: 0,
        seconds: 0,
      }
    }, 
    {
      name: 'medium',
      flips: 0,
      time: {
        minutes: 0,
        seconds: 0,
      }
    },
    {
      name: 'hard',
      flips: 0,
      time: {
        minutes: 0,
        seconds: 0,
      }
    }
  ]

// import { useState } from 'react'
function App() {

  const [game, setGame] = useState(false)
  const [difficulty, setDifficulty] = useState(difficultyData[0])
  const [highScoreData, setHighScoreData] = useState(() => {
    const data  = JSON.parse(localStorage.getItem('highScores'))

    return data ?? noHighScore
  })

  

  // useEffect( () => {

  //   const retrieveHighScores = () => {
  //     const data = JSON.parse(localStorage.getItem('highscores'));
  //     if (data == null) {
  //       setHighScoreData(noHighScore);
  //     } else {
  //       setHighScoreData(data);
  //     }
  // };

  // retrieveHighScores();
  // }, [game])

  useEffect( () => {

    localStorage.setItem('highScores', JSON.stringify(highScoreData))
    
  }, [highScoreData])

  const hsLayout = highScoreData.map( (highScore, index) => { 

    const minutes = ('00'+highScore.time.minutes).slice(-2)
    const seconds = ('00'+highScore.time.seconds).slice(-2)


    return (
      <div className='flex justify-between items-center' key={index}>
        <p className='capitalize'>{highScore.name}</p>
        <p>Flips: {highScore.flips} <br /> Time: {minutes}:{seconds}</p>
      </div>
    )
  })

  

  return (
    <main className='max-w-full md:max-w-[600px] lg:max-w-[600px] mx-auto max-h-screen py-2 px-3'>
      
      {
        game ? 
        <Deck difficulty={difficulty} setGame={setGame} highScore={highScoreData} updateHighScore={setHighScoreData}/> 
          :
        <div>
          <header className='text-center'>
            <h1 className='text-3xl font-bold underline'>Memory Game</h1>
            <p className='text-black/40'>@fullStackDev</p>
          </header>
          <p className='text-xl text-black'>Welcome! <br /> Want to find the best way to remember all that you need to become a fullStackDev? Well this is the game for you to play.</p>

          <div>
            <p className='text-black/80 text-sm text-center mt-4 '>Select Difficulty</p>

            <div className="flex justify-between">
            {
              difficultyData.map( (data, index) => {

                return (
                  <button key={index} className={`${(difficulty.name == data.name) && 'bg-red-700'} btn`} onClick={() => {setDifficulty(data)}}>
                    {data.name}
                  </button>
                )
              })
            }
            </div>

          </div>
          <button className='bg-red-600 btn text-lg text-white mx-auto block' onClick={() => setGame(true)}>Start Game</button>

          <h2 className='text-2xl text-center mt-6 btn w-1/2 mx-auto'>HighScores</h2>

          <div className='divide-y divide-black'>
          {hsLayout}

          </div>
        </div>
      }
    </main>
  )
}

export default App
