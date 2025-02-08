const apiImage = import.meta.env.VITE_API_IMAGE

import { BiImage } from 'react-icons/bi'
import styles from './Card.module.css'

import { Link } from 'react-router-dom'

export function CardPerson({ props, image }) {

    const { id, name, known_for_department } = props

    return (
        <Link to={`/person?q=${id}`} className={styles.card}>
            <div className={styles.cardImage}>
                {
                    image ? (
                        <img src={apiImage + image} alt={name} />
                    ) : (
                        <div className={styles.imageFake}>
                            <BiImage />
                        </div>
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