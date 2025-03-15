const apiKey = import.meta.env.VITE_API_KEY
const apiImage = import.meta.env.VITE_API_IMAGE

import styles from './css/Home.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CardMovie } from '../components/CardMovie'
import { CardSerie } from '../components/CardSerie'
import { CardRow } from '../components/CardRow'
import { getData } from '../services/api'

export function Home() {

    const [trendingMovieDay, setTrendingMovieDay] = useState([])
    const [trendingMovieWeek, setTrendingMovieWeek] = useState([])
    const [trendingSerieDay, setTrendingSerieDay] = useState([])
    const [trendingSerieWeek, setTrendingSerieWeek] = useState([])

    useEffect(() => {

        async function fetchData() {

            const language = "&language=pt-BR&page=1"

            const trendingMovieDay = await getData(`trending/movie/day?api_key=${apiKey}${language}`)
            const trendingMovieWeek = await getData(`trending/movie/week?api_key=${apiKey}${language}`)
            const trendingSerieDay = await getData(`trending/tv/day?api_key=${apiKey}${language}`)
            const trendingSerieWeek = await getData(`trending/tv/week?api_key=${apiKey}${language}`)

            setTrendingMovieDay(trendingMovieDay.results)
            setTrendingMovieWeek(trendingMovieWeek.results)
            setTrendingSerieDay(trendingSerieDay.results)
            setTrendingSerieWeek(trendingSerieWeek.results)

        }

        fetchData()

    }, [])

    return (
        <div className={styles.home}>

            <section>
                <h2>Filmes em tendência (Últimas 24 horas)</h2>
                <div className="row">
                    {
                        trendingMovieDay && (
                            trendingMovieDay.map(movie => (
                                (
                                    <CardRow
                                        key={movie.id}
                                        props={movie}
                                        image={movie.backdrop_path}
                                    />
                                )
                            ))
                        )
                    }
                </div>
            </section>

            <section>
                <h2>Filmes em tendência (Últimos 7 dias)</h2>
                <div className="column">
                    {
                        trendingMovieWeek && (
                            trendingMovieWeek.map(movie => (
                                <CardMovie
                                    props={movie}
                                    // image={movie.backdrop_path}
                                    image={movie.poster_path}
                                    key={movie.id}
                                />
                            ))
                        )
                    }
                </div>
            </section>

            <section>
                <h2>Séries em tendência (Últimas 24 horas)</h2>
                <div className="row">
                    {
                        trendingSerieDay && (
                            trendingSerieDay.map(movie => (
                                <Link to={`/movie?q=${movie.id}`} key={movie.id} className="">
                                    <div className="">
                                        <img src={apiImage + movie.backdrop_path} alt={movie.title} />
                                    </div>
                                    <div className="">
                                        <span className="">{movie.title}</span>
                                    </div>
                                </Link>
                            ))
                        )
                    }
                </div>
            </section>

            <section>
                <h2>Séries em tendência (Últimos 7 dias)</h2>
                <div className="column">
                    {
                        trendingSerieDay && (
                            trendingSerieWeek.map(serie => (
                                <CardSerie
                                    props={serie}
                                    // image={serie.backdrop_path}
                                    image={serie.poster_path}
                                    key={serie.id}
                                />
                            ))
                        )
                    }
                </div>
            </section>

        </div>
    )
}