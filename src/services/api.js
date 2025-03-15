const apiUrl = import.meta.env.VITE_API_URL

import axios from 'axios'

export async function getData(url) {
    const { data } = await axios.get(`${apiUrl}${url}`)
    console.log(data)
    return data;
}