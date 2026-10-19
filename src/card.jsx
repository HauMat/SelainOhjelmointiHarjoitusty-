import axios from 'axios'

const url = 'http://localhost:3001/api/cards'

const getCard = () => {
    return axios.get(`${url}/random`)
}

const newGame = () => {
    return axios.get(`${url}/newgame`)
}

const hold = () => {
    return axios.get(`${url}/hold`)
}

export default {getCard: getCard, newGame: newGame, hold: hold}