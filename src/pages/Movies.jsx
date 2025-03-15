const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL
const apiImage = import.meta.env.VITE_API_IMAGE

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { CardMovie } from '../components/CardMovie'
import { getData } from '../services/api'
import { Image } from '../components/Image'
import { CardRow } from '../components/CardRow'

export function Movies() {

    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])
    const [nowPlaying, SetNowPlaying] = useState([])
    const [upcoming, setUpcoming] = useState([])

    useEffect(() => {

        async function fetchData() {

            const language = "&language=pt-BR&page=1"

            const popular = await getData(`movie/popular?api_key=${apiKey}${language}`)
            const topRated = await getData(`movie/top_rated?api_key=${apiKey}${language}`)
            const nowPlaying = await getData(`movie/now_playing?api_key=${apiKey}${language}`)
            const upcoming = await getData(`movie/upcoming?api_key=${apiKey}${language}`)

            setPopular(popular.results)
            setTopRated(topRated.results)
            SetNowPlaying(nowPlaying.results)
            setUpcoming(upcoming.results)

        }

        fetchData()
    }, [])

    return (
        <div className="">

            <section className="">
                <h2>Filmes em cartaz</h2>
                <div className="row">
                    {
                        nowPlaying.map(movie => (
                            <CardRow
                                key={movie.id}
                                props={movie}
                                image={movie.backdrop_path}
                            />
                        ))
                    }
                </div>
            </section>

            <section className="">
                <h2>Filmes mais bem avaliados</h2>
                <div className="column">
                    {
                        topRated.map(movie => (
                            <CardMovie
                                props={movie}
                                image={movie.poster_path}
                                key={movie.id}
                            />
                        ))
                    }
                </div>
            </section>

            <section className="">
                <h2>Próximos lançamentos</h2>
                <div className="row">
                    {
                        upcoming.map(movie => (
                            <CardRow
                                key={movie.id}
                                props={movie}
                                image={movie.backdrop_path}
                            />
                        ))
                    }
                </div>
            </section>

            <section className="">
                <h2>Filmes populares</h2>
                <div className="column">
                    {
                        popular.map(movie => (
                            <CardMovie
                                props={movie}
                                image={movie.poster_path}
                                key={movie.id}
                            />
                        ))
                    }
                </div>
            </section>

        </div>
    )
}