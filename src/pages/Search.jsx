const apiKey = import.meta.env.VITE_API_KEY
const apiUrlSearchMovie = import.meta.env.VITE_API_SEARCH_MOVIE
const apiUrlSearchSerie = import.meta.env.VITE_API_SEARCH_SERIE
const apiUrlSearchPerson = import.meta.env.VITE_API_SEARCH_PERSON


import styles from './Search.module.css'

import { useState } from "react"
import { BiSearch } from "react-icons/bi"

import { CardMovie } from '../components/CardMovie.jsx'
import { CardSerie } from '../components/CardSerie.jsx'

import { Loading } from '../components/Loading.jsx'

export function Search() {

    //GET /search/movie → Buscar filmes por nome
    //GET /search/tv → Buscar séries por nome
    // GET /search/person → Buscar atores/diretores

    const [input, setInput] = useState("")

    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])
    const [persons, setPersons] = useState([])

    const [loading, setLoading] = useState(false)

    async function search(e) {
        e.preventDefault()
        setLoading(true)

        const responseMovies = await fetch(`${apiUrlSearchMovie}?query=${input}&api_key=${apiKey}`)
        const dataMovies = await responseMovies.json()

        const responseSeries = await fetch(`${apiUrlSearchSerie}?query=${input}&api_key=${apiKey}`)
        const dataSeries = await responseSeries.json()

        const responsePerson = await fetch(`${apiUrlSearchPerson}?query=${input}&api_key=${apiKey}`)
        const dataPerson = await responsePerson.json()

        setMovies(dataMovies.results)
        setSeries(dataSeries.results)
        setPersons(dataPerson.results)

        console.log(dataMovies)
        console.log(dataSeries)
        console.log(dataPerson)

        setLoading(false)
    }

    return (
        <div className={styles.search}>
            {loading && <Loading />}
            <form onSubmit={(e) => search(e)}>
                <div>
                    <input
                        type="text"
                        value={input}
                        onInput={(e) => {
                            setInput(e.target.value)
                        }}
                        placeholder="Pesquise aqui por um filme ou serie"
                    />
                    <BiSearch />
                </div>
            </form>
            <div>
                {
                    !movies && !series && !persons ? (
                        <div>Nenhum filme ou série encontrado!</div>
                    ) : (
                        <div>
                            <div className={styles.results}>
                                <div>
                                    Resultados de : <span>{input}</span>
                                </div>
                            </div>
                            {
                                movies.length > 0 && (
                                    <section>
                                        <h2>Filmes</h2>
                                        <div className={styles.column}>
                                            {
                                                movies.map(movie => (
                                                    <CardMovie
                                                        props={movie}
                                                        image={movie.poster_path}
                                                        key={movie.id}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </section>
                                )
                            }
                            {
                                series.length > 0 && (
                                    <section>
                                        <h2>Séries</h2>
                                        <div className={styles.column}>
                                            {
                                                series.map(serie => (
                                                    <CardSerie
                                                        props={serie}
                                                        image={serie.poster_path}
                                                        key={serie.id}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </section>
                                )
                            }
                            {
                                persons.length > 0 && (
                                    <section>
                                        <h2>Atores e Diretores</h2>
                                        <div className={styles.column}>
                                            {
                                                persons.map(person => (
                                                    <CardSerie
                                                        props={person}
                                                        key={person.id}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </section>
                                )
                            }
                        </div>
                    )
                }
            </div>

        </div>
    )
}