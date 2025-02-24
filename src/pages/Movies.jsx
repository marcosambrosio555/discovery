const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL
const apiImage = import.meta.env.VITE_API_IMAGE

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { CardMovie } from '../components/CardMovie'

export function Movies() {

    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])
    const [nowPlaying, SetNowPlaying] = useState([])
    const [upcoming, setUpcoming] = useState([])

    useEffect(() => {

        async function fetchData() {

            const responsePopular = await fetch(`${apiUrl}movie/popular?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseTopRated = await fetch(`${apiUrl}movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseNowPlaying = await fetch(`${apiUrl}movie/now_playing?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseUpcoming = await fetch(`${apiUrl}movie/upcoming?api_key=${apiKey}&language=pt-BR&page=1`)

            const dataPopular = await responsePopular.json()
            const dataTopRated = await responseTopRated.json()
            const dataNowPlaying = await responseNowPlaying.json()
            const dataUpcoming = await responseUpcoming.json()

            setPopular(dataPopular.results)
            setTopRated(dataTopRated.results)
            SetNowPlaying(dataNowPlaying.results)
            setUpcoming(dataUpcoming.results)

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
                            <Link to={`/movie?q=${movie.id}`} key={movie.id} className="">
                                <div className="">
                                    <img src={apiImage + movie.backdrop_path} alt={movie.title} />
                                </div>
                                <div className="">
                                    <span className="">{movie.title}</span>
                                </div>
                            </Link>
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
                            <Link to={`/movie?q=${movie.id}`} key={movie.id} className="">
                                <div className="">
                                    <img src={apiImage + movie.backdrop_path} alt={movie.title} />
                                </div>
                                <div className="">
                                    <span className="">{movie.title}</span>
                                </div>
                            </Link>
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