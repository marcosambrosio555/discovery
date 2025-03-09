import styles from './css/Card.module.css'

import { Link } from 'react-router-dom'
import { Image } from './Image'

import { FakeImage } from './FakeImage'

export function CardPerson({ props, image }) {

    const { id, name, known_for_department } = props

    return (
        <Link to={`/person?q=${id}`} className={styles.card}>
            <div className={styles.cardImage}>
                {
                    image ? (
                        <Image image={image} title={name} />
                    ) : (
                        <FakeImage />
                    )
                }
            </div>
            <div className={styles.cardBody}>
                <span className={styles.name}>
                    {name}
                </span>
                <span translate='yes' className={styles.known_for_department}>
                    Area de atuação : {known_for_department}
                </span>
            </div>
        </Link>
    )
}