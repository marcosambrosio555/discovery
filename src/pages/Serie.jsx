const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL
const apiImage = import.meta.env.VITE_API_IMAGE


import styles from './Serie.module.css'

import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Loading } from '../components/Loading'

export function Serie() {

    const [loading, setLoading] = useState(true)
    const [serie, setSerie] = useState(null)
    const [seachParams] = useSearchParams()
    const id = seachParams.get("q")

    useEffect(() => {
        async function fetchData() {

            const response = await fetch(`${apiUrl}tv/${id}?api_key=${apiKey}&language=pt-BR`)
            const data = await response.json()
            console.log(data)
            setLoading(false)

            setSerie(data)

        }
        fetchData()
    }, [id])

    function listGenres(genres) {
        return genres.map(item => (
            <span key={item.id}>{item.name}</span>
        ))
    }

    return (
        <>
            {loading && <Loading />}
            {
                serie ? (
                    <div className="container-sm">
                        <div className={styles.serie}>
                            <div className={styles.cardImage}>
                                <img src={apiImage + serie.poster_path} alt={serie.title} />
                            </div>
                            <div className={styles.cardBody}>

                                <div className={styles.name}>
                                    {serie.name}
                                </div>

                                <div className={styles.tagline}>
                                    <span>{serie.tagline}</span>
                                </div>

                                <div className={styles.originalName}>
                                    <span>Título original : </span>
                                    <span>{serie.original_name}</span>
                                </div>
                                <div className={styles.voteAverage}>
                                    <span>IMdb : </span>
                                    <span>{Number(serie.vote_average).toFixed(1)}</span>
                                </div>
                                <div className={styles.genres}>
                                    <span>Genero : </span>
                                    <span>{listGenres(serie.genres)}</span>
                                </div>
                                <div className={styles.createdBy}>
                                    <span>Criado por : </span>
                                    <span>
                                        {
                                            serie.created_by.map((person) => (
                                                <Link key={person.id} to={`/person/${person.id}`}>
                                                    {person.name}
                                                </Link>
                                            ))
                                        }
                                    </span>
                                </div>
                                <div className={styles.originCountry}>
                                    <span>País de origem : </span>
                                    <span>{serie.origin_country}</span>
                                </div>
                                <div className={styles.runtime}>
                                    <span>Duração : </span>
                                    <span>{serie.runtime} minutos</span>
                                </div>
                                <div className={styles.revenue}>
                                    <span>Número de temporadas</span>
                                    <span>{serie.number_of_seasons}</span>
                                </div>
                                <div className={styles.budget}>
                                    <span>Número de episódios</span>
                                    <span>{serie.number_of_episodes}</span>
                                </div>
                                <div className={styles.production}>
                                    <span>Produtora</span>
                                    <span>{serie.production} Lion Gate</span>
                                </div>
                                <div className={styles.releaseDate}>
                                    <span>Primeiro episódio no ar : </span>
                                    <span>{serie.first_air_date}</span>
                                </div>
                                <div className={styles.releaseDate}>
                                    <span>Ultimo episódio no ar : </span>
                                    <span>{serie.last_air_date}</span>
                                </div>
                                <div className={styles.overview}>
                                    <span>{serie.overview}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Série não encontrada!</div>
                )
            }
        </>
    )

}

