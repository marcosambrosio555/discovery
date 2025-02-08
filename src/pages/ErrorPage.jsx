import { Link } from 'react-router-dom'
import styles from './css/ErrorPage.module.css'
import { BiHome } from 'react-icons/bi'

export function ErrorPage() {
    return (
        <div className={styles.errorPage}>
            <div>
                <h2>Página não encontrada</h2>
                <p>O enderenço que você está tentando acessar não foi encontrada!</p>
                <Link to="/" className='btn'>
                    <BiHome /> Ir para Página inicial
                </Link>
            </div>
        </div>
    )
}