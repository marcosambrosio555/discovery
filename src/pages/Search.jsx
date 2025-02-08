const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL

import styles from './css/Search.module.css'

import { useState } from "react"
import { BiSearch } from "react-icons/bi"

import { CardMovie } from '../components/CardMovie.jsx'
import { CardSerie } from '../components/CardSerie.jsx'
import { Loading } from '../components/Loading.jsx'
import { CardPerson } from '../components/CardPerson.jsx'

export function Search() {

    const [input, setInput] = useState("")
    const [searchResult, setSearchResult] = useState(null)

    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])
    const [persons, setPersons] = useState([])
    const [loading, setLoading] = useState(false)

    async function search(e) {

        e.preventDefault()
        if (!input) return
        setLoading(true)

        const responseMovies = await fetch(`${apiUrl}search/movie?query=${input}&api_key=${apiKey}`)
        const dataMovies = await responseMovies.json()
        const responseSeries = await fetch(`${apiUrl}search/tv?query=${input}&api_key=${apiKey}`)
        const dataSeries = await responseSeries.json()
        const responsePerson = await fetch(`${apiUrl}search/person?query=${input}&api_key=${apiKey}`)
        const dataPerson = await responsePerson.json()

        setMovies(dataMovies.results)
        setSeries(dataSeries.results)
        setPersons(dataPerson.results)

        console.log(dataMovies)
        console.log(dataSeries)
        console.log(dataPerson)

        setSearchResult(input)
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
                    searchResult && (
                        <div className={styles.results}>
                            <div>
                                Resultados de : <span>{searchResult}</span>
                            </div>
                        </div>
                    )
                }
                {
                    searchResult && (
                        <>
                            <div>

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
                                                        <CardPerson
                                                            props={person}
                                                            image={person.profile_path}
                                                            key={person.id}
                                                            known_for={person.known_for}
                                                        />
                                                    ))
                                                }
                                            </div>
                                        </section>
                                    )
                                }
                            </div>
                        </>
                    )
                }
                {
                    searchResult && movies.length === 0 && series.length === 0 ? (
                        <div>
                            Nenhum resultado encontrado!
                        </div>
                    ) : (
                        <div></div>
                    )
                }

            </div>
        </div>
    )
}