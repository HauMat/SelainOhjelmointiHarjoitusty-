import http from 'http'
import express from 'express'
import fs from 'fs'
import cors from 'cors'

const app = express()
app.use(cors())
let cards = JSON.parse(fs.readFileSync('./db.json', "utf-8"))

let HandP = []
let HandD = []
let playing = false

const Sum = (hand) => {
    return hand.reduce((acc, card) => acc + card.value, 0)
}

const getWinner = (HandP, HandD) => {
    const p = Sum(HandP)
    const d = Sum(HandD)
    
    if (d==p)
        return draw
}


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/cards', (request, response) => {
  response.json(cards)
})

app.get('/api/cards/random', (request, response) => {
    const card = cards[Math.floor(Math.random() * cards.length)]
    HandP = [...HandP, card]
    if (Sum(HandP)>21){
        playing = false
        response.json(HandP)
    }
    else{
        playing = true
        response.json(HandP)}

})

app.get('/api/cards/hold', (request, response) => {
    if (playing === true){
    while(Sum(HandD)<=Sum(HandP)){
        const card = cards[Math.floor(Math.random() * cards.length)]
        HandD = [...HandD, card]}
    response.json(HandD)}
})

app.get('/api/cards/newgame', (request, response) => {
    HandP = []
    HandD = []
    response.json({ HandP, HandD })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})