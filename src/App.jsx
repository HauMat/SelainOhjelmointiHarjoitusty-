import card from './card.jsx'
import './index.css'
import { useState } from 'react'
import Notification from './Notification.jsx'

const App = () => {
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')
  const [currency, setCurrency] = useState(200)
  const [bet, setBet] = useState('')
  const [handP, setHandP] = useState([])
  const [handD, setHandD] = useState([])
  
  const pullCard = () => {
    card
    .getCard()
    .then(response => {
      setHandP(response.data)
      })
    }

  const deal = () => {
    card
    .hold()
    .then(response => {
      setHandD(response.data)
    })
  }

  const newGame = () => {
    card.newGame().then(response => {
      setHandP(response.data.HandP)
      setHandD(response.data.HandD)
    })
  }



  return (
    <div>
      <Notification message={message} color={color}/>
      <h1>Blackjack</h1>
      <p>Player's money: {currency}</p>
      <button onClick={pullCard}>Card</button>
      <br></br>
      <button onClick={deal}>Hold</button>
      <br />
      Player's value: {handP.reduce((acc, card) => acc + card.value, 0)}
      <br/>
      Dealer's value: {handP.reduce((acc, card) => acc + card.value, 0)}
      <br></br>
      <button onClick={newGame}>New Game</button>
      Bet:<input type="text"/>
      <button>Place Bet</button>
      <h1>Player's hand</h1>
      <ul>
        {handP.map(card => <img key={card.img} class="card" src={card.img} alt="" />)}
      </ul>
      <h1>Dealer's hand</h1>
      <ul>
        {handD.map(card => <img key={card.img} class="card" src={card.img} alt="" />)}
      </ul>
    </div>
  )
}

export default App