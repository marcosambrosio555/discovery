const apiImage = import.meta.env.VITE_API_IMAGE

import styles from './Card.module.css'

import { Link } from 'react-router-dom'

export function CardPerson({ props, image }) {

    const { id, name, vote_average, release_date } = props

    return (
        <Link to={`/person?q=${id}`} className={styles.cardPerson}>
            <div className={styles.cardImage}>
                <img src={apiImage + image} alt={name} />
            </div>
            <div className={styles.cardBody}>
                <span className={styles.name}>{name}</span>
                {/* <span className={styles.rate}>
                    IMdb :  {Number(vote_average).toFixed(1)}
                </span> */}
            </div>
        </Link>
    )
}