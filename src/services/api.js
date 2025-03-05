// const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL
// const apiImage = import.meta.env.VITE_API_IMAGE

import axios from 'axios'

export async function getData(url) {
    const { data } = await axios.get(`${apiUrl}${url}`)
    return data.results;
}