import styles from './css/Card.module.css'

import { Link } from 'react-router-dom'
import { Image } from './Image'
import { FakeImage } from './FakeImage'

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
                        <Image image={image} title={original_name} />
                    ) : (
                        <FakeImage />
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