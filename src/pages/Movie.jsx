const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL

import styles from './css/SinglePage.module.css'

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Loading } from '../components/Loading'
import { Image } from '../components/Image'
import { getData } from '../services/api'

export function Movie() {

    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState(null)
    const [seachParams] = useSearchParams()
    const id = seachParams.get("q")

    // const movieExample = {
    //     adult: false,
    //     backdrop_path: "/backdrop.jpg",
    //     belongs_to_collection: {
    //         id: 8945,
    //         name: "John Wick Collection",
    //         poster_path: "/collection_poster.jpg",
    //         backdrop_path: "/collection_backdrop.jpg"
    //     },
    //     budget: 100000000,
    //     genres: [
    //         { "id": 28, "name": "Ação" },
    //         { "id": 53, "name": "Thriller" }
    //     ],
    //     homepage: "https://www.johnwickmovie.com",
    //     id: 603692,
    //     imdb_id: "tt10366206",
    //     original_language: "en",
    //     original_title: "John Wick: Chapter 4",
    //     overview: "John Wick enfrenta seus inimigos ao redor do mundo...",
    //     popularity: 1200.56,
    //     poster_path: "/poster.jpg",
    //     production_companies: [
    //         {
    //             id: 1632,
    //             logo_path: "/studio_logo.png",
    //             name: "Lionsgate",
    //             origin_country: "US"
    //         }
    //     ],
    //     production_countries: [
    //         { "iso_3166_1": "US", "name": "Estados Unidos" }
    //     ],
    //     release_date: "2023-03-24",
    //     revenue: 400000000,
    //     runtime: 169,
    //     spoken_languages: [
    //         { english_name: "English", "iso_639_1": "en", "name": "English" }
    //     ],
    //     status: "Released",
    //     tagline: "Sem saída. Sem volta. Sem fim.",
    //     title: "John Wick 4",
    //     video: false,
    //     vote_average: 8.2,
    //     vote_count: 5000
    // }

    // useEffect(() => {

    //     console.log(movieExample)

    //     setMovie(movieExample)

    //     setLoading(false)

    // }, [])


    useEffect(() => {
        async function fetchData() {

            const language = "&language=pt-BR"

            const data = await getData(`movie/${id}?api_key=${apiKey}${language}`)

            console.log(data)

            setLoading(false)
            setMovie(data)

        }
        fetchData()
    }, [id])


    function convertValue(value) {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }


    return (
        <>
            {loading && <Loading />}
            {
                movie ? (
                    <div className="container-sm">
                        <div className={styles.movie}>
                            <div className={styles.cardImage}>
                                <Image image={movie.poster_path} title={movie.title} />
                            </div>
                            <div className={styles.cardBody}>

                                <div className={styles.title}>
                                    {movie.title}
                                </div>

                                <div className={styles.tagline}>
                                    <span>{movie.tagline}</span>
                                </div>

                                <div className={styles.originalTitle}>
                                    <span>Título original : </span>
                                    <span>{movie.original_title}</span>
                                </div>
                                <div className={styles.voteAverage}>
                                    <span>IMdb : </span>
                                    <span>{Number(movie.vote_average).toFixed(1)}</span>
                                </div>
                                <div className={styles.genres}>
                                    <span>Genero : </span>
                                    <div>
                                        {
                                            movie.genres.map(item => (
                                                <span key={item.id}>{item.name}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={styles.runtime}>
                                    <span>Duração : </span>
                                    <span>{movie.runtime} minutos</span>
                                </div>
                                <div className={styles.budget}>
                                    <span>Orçamento : </span>
                                    <span>{convertValue(movie.budget)}</span>
                                </div>
                                <div className={styles.revenue}>
                                    <span>Receita : </span>
                                    <span>{convertValue(movie.revenue)}</span>
                                </div>
                                <div className={styles.production}>
                                    <span>Produtora : </span>
                                    <span>{movie.production}</span>
                                </div>
                                <div className={styles.country}>
                                    <span>País de origem : </span>
                                    <div>
                                        {
                                            movie.production_countries.map(country => (
                                                <span key={country.iso_3166_1}>
                                                    {country.name}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={styles.releaseDate}>
                                    <span>Data de lançamento : </span>
                                    <span>{movie.release_date}</span>
                                </div>
                                <div className={styles.overview}>
                                    <span>{movie.overview}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Filme não encontrado!</div>
                )
            }
        </>
    )

}

