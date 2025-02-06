const apiImage = import.meta.env.VITE_API_IMAGE

import styles from './Card.module.css'

import { Link } from 'react-router-dom'

export function CardMovie({ props, image }) {

    const { id, title, vote_average, release_date } = props

    function convertRealeseDate(value) {
        return value.split("-")[0]
    }

    return (
        <Link to={`/movie?q=${id}`} className={styles.card}>
            <div className={styles.cardImage}>
                <img src={apiImage + image} alt={title} />
            </div>
            <div className={styles.cardBody}>
                <span className={styles.title}>{title}</span>
                <span className={styles.releaseDate}>
                    Ano de lançamento : {convertRealeseDate(release_date)}
                </span>
                <span className={styles.rate}>
                    IMdb :  {Number(vote_average).toFixed(1)}
                </span>

            </div>
        </Link>
    )
}