import styles from './css/Card.module.css'
import { Link } from 'react-router-dom'
import { Image } from './Image'

export function CardRow({ props, image }) {

    const { id, title, rate, vote_average } = props

    return (
        <Link to={`/movie?q=${id}`} key={id}
            className={styles.card}>
            <div className="card-image">
                <Image image={image} title={title} />
            </div>
            <div className={styles.cardBody}>
                <span className={styles.title}>{title}</span>
                <span className={styles.rate}>
                    IMdb :  {Number(vote_average).toFixed(1)}
                </span>
            </div>
        </Link>
    )
}