const apiImage = import.meta.env.VITE_API_IMAGE

import { BiImage } from 'react-icons/bi'
import styles from './css/Card.module.css'

import { Link } from 'react-router-dom'

export function CardSerie({ props, image }) {

    const { id, original_name, vote_average, first_air_date } = props

    function convertRealeseDate(value) {
        return value.split("-")[0]
    }

    return (
        <Link to={`/serie?q=${id}`} className={styles.card}>
            <div className={styles.cardImage}>
                {
                    image ? (
                        <img src={apiImage + image} alt={original_name} />
                    ) : (
                        <div className={styles.imageFake}>
                            <BiImage />
                        </div>
                    )
                }
            </div>
            <div className={styles.cardBody}>
                <span className={styles.originalName}>{original_name}</span>
                <span className={styles.firstAirDate}>
                    Ano de lançamento : {convertRealeseDate(first_air_date)}
                </span>
                <span className={styles.rate}>
                    IMdb :  {Number(vote_average).toFixed(1)}
                </span>

            </div>
        </Link>
    )
}