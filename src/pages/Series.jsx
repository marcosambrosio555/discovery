const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL
const apiImage = import.meta.env.VITE_API_IMAGE

import styles from './Series.module.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { CardSerie } from '../components/CardSerie'

export function Series() {

    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])
    const [onTheAir, setOnTheAir] = useState([])

    useEffect(() => {

        async function fetchData() {

            const responsePopular = await fetch(`${apiUrl}tv/popular?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseTopRated = await fetch(`${apiUrl}tv/top_rated?api_key=${apiKey}&language=pt-BR&page=1`)
            const responseOnTheAir = await fetch(`${apiUrl}tv/on_the_air?api_key=${apiKey}&language=pt-BR&page=1`)

            const dataPopular = await responsePopular.json()
            const dataTopRated = await responseTopRated.json()
            const dataOnTheAir = await responseOnTheAir.json()

            setPopular(dataPopular.results)
            setTopRated(dataTopRated.results)
            setOnTheAir(dataOnTheAir.results)

        }

        fetchData()
    }, [])

    return (
        <div className={styles.series}>

            <section className={styles.now_playing}>
                <h2>Séries em cartaz</h2>
                <div className={styles.row}>
                    {
                        onTheAir.map(serie => (
                            <Link to={`/serie?q=${serie.id}`} key={serie.id} className={styles.card}>
                                <div className={styles.cardImage}>
                                    <img src={apiImage + serie.backdrop_path} alt={serie.name} />
                                </div>
                                <div className={styles.cardBody}>
                                    <span className={styles.name}>{serie.name}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>

            <section className={styles.top_rated}>
                <h2>Séries mais bem avaliadas</h2>
                <div className={styles.column}>
                    {
                        topRated.map(serie => (
                            <CardSerie
                                props={serie}
                                image={serie.poster_path}
                                key={serie.id}
                            />
                        ))
                    }
                </div>
            </section>

            <section className={styles.popular}>
                <h2>Séries populares</h2>
                <div className={styles.column}>
                    {
                        popular.map(serie => (
                            <CardSerie
                                props={serie}
                                image={serie.poster_path}
                                key={serie.id}
                            />
                        ))
                    }
                </div>
            </section>

        </div>
    )
}