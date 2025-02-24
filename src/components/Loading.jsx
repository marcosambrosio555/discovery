import styles from './css/Loading.module.css'

export function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
        </div>
    )
}