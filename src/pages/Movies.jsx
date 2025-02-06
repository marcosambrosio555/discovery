const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL_MOVIES
const apiImage = import.meta.env.VITE_API_IMAGE

import styles from './Movies.module.css'
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

            const responsePopular = await fetch(`${apiUrl}popular?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseTopRated = await fetch(`${apiUrl}top_rated?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseNowPlaying = await fetch(`${apiUrl}now_playing?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseUpcoming = await fetch(`${apiUrl}upcoming?api_key=${apiKey}&language=pt-BR&page=1`)

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
        <div className={styles.movies}>

            <section className={styles.now_playing}>
                <h2>Filmes em cartaz</h2>
                <div className={styles.row}>
                    {
                        nowPlaying.map(movie => (
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

            <section className={styles.top_rated}>
                <h2>Filmes mais bem avaliados</h2>
                <div className={styles.column}>
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

            <section className={styles.upcoming}>
                <h2>Próximos lançamentos</h2>
                <div className={styles.row}>
                    {
                        upcoming.map(movie => (
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

            <section className={styles.popular}>
                <h2>Filmes populares</h2>
                <div className={styles.column}>
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