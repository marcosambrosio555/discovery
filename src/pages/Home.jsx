const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL
const apiImage = import.meta.env.VITE_API_IMAGE

import styles from './css/Home.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { CardMovie } from '../components/CardMovie'

export function Home() {

    const [trendingMovieDay, setTrendingMovieDay] = useState([])
    const [trendingMovieWeek, setTrendingMovieWeek] = useState([])
    const [trendingSerieDay, setTrendingSerieDay] = useState([])
    const [trendingSerieWeek, setTrendingSerieWeek] = useState([])

    useEffect(() => {

        async function fetchData() {

            const responseTrendingMovieDay = await fetch(`${apiUrl}trending/movie/day?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseTrendingMovieWeek = await fetch(`${apiUrl}trending/movie/week?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseTrendingSerieDay = await fetch(`${apiUrl}trending/tv/day?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseTrendingSerieWeek = await fetch(`${apiUrl}trending/tv/week?api_key=${apiKey}&language=pt-BR&page=1`)

            const dataTrendingMovieDay = await responseTrendingMovieDay.json()
            const dataTrendingMovieWeek = await responseTrendingMovieWeek.json()
            const dataTrendingSerieDay = await responseTrendingSerieDay.json()
            const dataTrendingSerieWeek = await responseTrendingSerieWeek.json()

            setTrendingMovieDay(dataTrendingMovieDay.results)
            setTrendingMovieWeek(dataTrendingMovieWeek.results)
            setTrendingSerieDay(dataTrendingSerieDay.results)
            setTrendingSerieWeek(dataTrendingSerieWeek.results)

            console.log(dataTrendingMovieDay)
            console.log(dataTrendingMovieWeek)
            console.log(dataTrendingSerieDay)
            console.log(dataTrendingSerieWeek)

        }

        fetchData()
    }, [])

    return (
        <div className={styles.movies}>

            <section>
                <h2>Filmes em tendência (Últimas 24 horas)</h2>
                <div className={styles.row}>
                    {
                        trendingMovieDay.map(movie => (
                            <Link to={`/movie?q=${movie.id}`} key={movie.id} className={styles.card}>
                                <div className={styles.cardImage}>
                                    <img src={apiImage + movie.backdrop_path} alt={movie.title} />
                                </div>
                                <div className={styles.cardBody}>
                                    <span className={styles.title}>{movie.title}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>

            <section>
                <h2>Filmes em tendência (Últimos 7 dias)</h2>
                <div className={styles.column}>
                    {
                        trendingMovieWeek.map(movie => (
                            <Link to={`/movie?q=${movie.id}`} key={movie.id} className={styles.card}>
                                <div className={styles.cardImage}>
                                    <img src={apiImage + movie.backdrop_path} alt={movie.title} />
                                </div>
                                <div className={styles.cardBody}>
                                    <span className={styles.title}>{movie.title}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>

            <section>
                <h2>Séries em tendência (Últimas 24 horas)</h2>
                <div className={styles.row}>
                    {
                        trendingSerieDay.map(movie => (
                            <Link to={`/movie?q=${movie.id}`} key={movie.id} className={styles.card}>
                                <div className={styles.cardImage}>
                                    <img src={apiImage + movie.backdrop_path} alt={movie.title} />
                                </div>
                                <div className={styles.cardBody}>
                                    <span className={styles.title}>{movie.title}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>

            <section>
                <h2>Séries em tendência (Últimos 7 dias)</h2>
                <div className={styles.column}>
                    {
                        trendingSerieWeek.map(movie => (
                            <Link to={`/movie?q=${movie.id}`} key={movie.id} className={styles.card}>
                                <div className={styles.cardImage}>
                                    <img src={apiImage + movie.backdrop_path} alt={movie.title} />
                                </div>
                                <div className={styles.cardBody}>
                                    <span className={styles.title}>{movie.title}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>

        </div>
    )
}