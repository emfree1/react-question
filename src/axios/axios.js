import axios from 'axios'

export default axios.create({
    baseURL: 'https://cart-question.firebaseio.com/',
})