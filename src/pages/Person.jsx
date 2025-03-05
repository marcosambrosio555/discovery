const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL
const apiImage = import.meta.env.VITE_API_IMAGE

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import styles from './css/SinglePage.module.css'

import { CardMovie } from '../components/CardMovie'
import { CardSerie } from '../components/CardSerie'
import { Loading } from '../components/Loading'
import { BiImage } from 'react-icons/bi'

export function Person() {

    const [loading, setLoading] = useState(true)
    const [person, setPerson] = useState(null)
    const [personDataSearch, setPersonDataSearch] = useState([])
    const [seachParams] = useSearchParams()
    const id = seachParams.get("q")

    useEffect(() => {
        async function fetchData() {

            const response = await fetch(`${apiUrl}person/${id}?api_key=${apiKey}&language=pt-BR`)
            const data = await response.json()
            const responsePersons = await fetch(`${apiUrl}search/person?query=${data.name}&api_key=${apiKey}`)
            const dataPersons = await responsePersons.json()

            const personFinded = dataPersons.results.filter(person => {
                return person.id === data.id
            })

            setPersonDataSearch(personFinded[0])

            setLoading(false)
            setPerson(data)
        }
        fetchData()
    }, [id])

    return (
        <>
            {loading && <Loading />}
            {
                person ? (
                    <div className="container-sm">
                        <div className={styles.person}>
                            <div className={styles.cardImage}>
                                {
                                    person.profile_path ? (
                                        <img src={apiImage + person.profile_path} alt={person.name} />
                                    ) : (
                                        <div className={styles.imageFake}>
                                            <BiImage />
                                        </div>
                                    )
                                }
                            </div>
                            <div className={styles.cardBody}>

                                <div className={styles.name}>
                                    {person.name}
                                </div>

                                <div className={styles.birthday}>
                                    <span>Data de nascimento : </span>
                                    <span>{person.birthday}</span>
                                </div>
                                <div className={styles.place_of_birth}>
                                    <span>Local de nascimento : </span>
                                    <span>{person.place_of_birth}</span>
                                </div>
                                <div className={styles.known_for_department}>
                                    <span>Area de atuação : </span>
                                    <span>{person.known_for_department}</span>
                                </div>
                                <div className={styles.biography}>
                                    <span>{person.biography}</span>
                                </div>
                                <div>
                                    {
                                        personDataSearch.known_for && (
                                            <div>
                                                <div>Conhecido por :</div>
                                                {
                                                    <div className={styles.column}>
                                                        {
                                                            personDataSearch.known_for.map(project => (
                                                                project.media_type === "movie" && (
                                                                    <CardMovie
                                                                        props={project}
                                                                        image={project.poster_path}
                                                                        key={project.id}
                                                                    />
                                                                )
                                                            ))
                                                        }
                                                        {
                                                            personDataSearch.known_for.map(project => (
                                                                project.media_type === "tv" && (
                                                                    <CardSerie
                                                                        props={project}
                                                                        image={project.poster_path}
                                                                        key={project.id}
                                                                    />
                                                                )
                                                            ))
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                        </div>
                    </div >
                ) : (
                    <div>Usuário não encontrado!</div>
                )
            }
        </>
    )

}

