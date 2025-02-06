import styles from './Preloader.module.css'

import { BiMoviePlay } from 'react-icons/bi'

export function Preloader() {
    return (
        <div className={styles.preloader}>
            <BiMoviePlay />
            <div>Discovery</div>
        </div>
    )
}