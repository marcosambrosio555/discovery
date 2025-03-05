import styles from './css/Card.module.css'

import { Link } from 'react-router-dom'
import { Image } from './Image'
import { FakeImage } from './FakeImage'

export function CardMovie({ props, image }) {

    const { id, title, vote_average, release_date } = props

    function convertRealeseDate(value) {
        return value.split("-")[0]
    }

    return (
        <Link to={`/movie?q=${id}`} className={styles.card}>
            <div className={styles.cardImage}>
                {
                    image ? (
                        <Image image={image} title={title} />
                    ) : (
                        <FakeImage />
                    )
                }
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