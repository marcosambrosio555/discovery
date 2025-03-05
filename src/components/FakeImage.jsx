import { BiImage } from 'react-icons/bi'

import styles from './css/FakeImage.module.css'

export function FakeImage() {
    return (
        <div className={styles.imageFake}>
            <BiImage />
        </div>
    )
}