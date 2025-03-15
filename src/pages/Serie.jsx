const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL
const apiImage = import.meta.env.VITE_API_IMAGE


import styles from './css/SinglePage.module.css'

import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Loading } from '../components/Loading'
import { getData } from '../services/api'
import { Image } from '../components/Image'

export function Serie() {

    const [loading, setLoading] = useState(true)
    const [serie, setSerie] = useState(null)
    const [seachParams] = useSearchParams()
    const id = seachParams.get("q")

    useEffect(() => {
        async function fetchData() {

            const data = await getData(`tv/${id}?api_key=${apiKey}&language=pt-BR`)
            console.log(data)
            setLoading(false)
            setSerie(data)

        }
        fetchData()
    }, [id])

    return (
        <>
            {loading && <Loading />}
            {
                serie ? (
                    <div className="container-sm">
                        <div className={styles.serie}>
                            <div className={styles.cardImage}>
                                <Image image={serie.poster_path} title={serie.title} />
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
                                    <div>
                                        {
                                            serie.genres.map(item => (
                                                <span key={item.id}>{item.name}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={styles.createdBy}>
                                    <span>Criado por : </span>
                                    <div>
                                        {
                                            serie.created_by.map((person) => (
                                                <Link key={person.id} to={`/person/${person.id}`}>
                                                    {person.name}
                                                </Link>
                                            ))
                                        }
                                    </div>
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
                                    <span>{serie.production}</span>
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

