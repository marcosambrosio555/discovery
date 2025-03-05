const apiKey = import.meta.env.VITE_API_KEY
const apiUrl = import.meta.env.VITE_API_URL
const apiImage = import.meta.env.VITE_API_IMAGE

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { CardSerie } from '../components/CardSerie'
import { getData } from '../services/api'

export function Series() {

    const [popular, setPopular] = useState([])
    const [topRated, setTopRated] = useState([])
    const [onTheAir, setOnTheAir] = useState([])

    useEffect(() => {

        async function fetchData() {

            const language = "&language=pt-BR&page=1"

            const popular = await getData(`tv/popular?api_key=${apiKey}${language}`)
            const topRated = await getData(`tv/top_rated?api_key=${apiKey}${language}`)
            const onTheAir = await getData(`tv/on_the_air?api_key=${apiKey}${language}`)

            setPopular(popular)
            setTopRated(topRated)
            setOnTheAir(onTheAir)

        }

        fetchData()
    }, [])

    return (
        <div className="">

            <section className="">
                <h2>Séries em cartaz</h2>
                <div className="row">
                    {
                        onTheAir.map(serie => (
                            <Link to={`/serie?q=${serie.id}`} key={serie.id} className="">
                                <div className="">
                                    <img src={apiImage + serie.backdrop_path} alt={serie.name} />
                                </div>
                                <div className="">
                                    <span className="">{serie.name}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </section>

            <section className="">
                <h2>Séries mais bem avaliadas</h2>
                <div className="column">
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

            <section className="">
                <h2>Séries populares</h2>
                <div className="column">
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