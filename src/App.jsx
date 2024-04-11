import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import { useEffect } from 'react';

function App() {
  const [cards, setCards] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [move, setMove] = useState(0);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const items = [
     {
      id: "1",
      symbol: '💪',
      matchFound: false,
      fliped: false
     }, 
     {
      id: "2",
      symbol: '⏲',
      matchFound: false,
      fliped: false
     }, 
     {
      id: "3",
      symbol: '🪓',
      matchFound: false,
      fliped: false
     }, 
     {
      id: "4",
      symbol: '🗡',
      matchFound: false,
      fliped: false
     }, 
     {
      id: "5",
      symbol: '⚔️',
      matchFound: false,
      fliped: false
     }, 
     {
      id: "6",
      symbol: '🛡',
      matchFound: false,
      fliped: false
     }, 
     {
      id: "7",
      symbol: '⛏',
      matchFound: false,
      fliped: false
     }, 
     {
      id: "8",
      symbol: '⚒',
      matchFound: false,
      fliped: false
     }, 
    ]

  function resetCards() {
    const shuffled = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, key: crypto.randomUUID()}))
    setCards(shuffled)
  }

  function handleCardClick(id) {
    if (firstSelection) {
      setSecondSelection(id)
    } else {
      setFirstSelection(id)
    }
  }

  function resetTurn() {
    setFirstSelection(null);
    setSecondSelection(null);
    setMove(m => m + 1);
    setDisabled(false);
    if (score === 8) {
      alert("Congrats you won")
      return resetCards()
    }
  }

  function handleNewGameClick() {
    resetTurn();
    setMove(0);
    setScore(0);
  }


   useEffect(() => {
      resetCards()
   }, [])

   useEffect(() => {
      if (!secondSelection) return
      setDisabled(true)
      if (firstSelection === secondSelection) {
        setCards(prev => prev.map(card => {
          if (card.id === firstSelection) {
            return {...card, matchFound: true}
          } else {
            return card
          }
        }))
        setScore(prev => prev + 1)
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
   }, [firstSelection, secondSelection])

  return (
    <div className='app'>
      <button 
        onClick={() => handleNewGameClick()}
      >
        New Game
      </button>
      <div className='gameboard'>
        {
          cards && (
            Object.values(cards).map((item) => (
              <Card key={item.key} emoji={item} handleCardClick={handleCardClick} disabled={disabled}/>
            ))
          )
        }
      </div>
      <p>Total Moves: {move}</p>
      <p>Total Score: {score}</p>
    </div>
  )
}

export default App
