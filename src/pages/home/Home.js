import styles from './Home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {


    return (
        <div className={styles.home}>
            <span className={styles.taskHome}>
                <h1>Sua lista de tarefas favorita!</h1>
            </span>

            <div className={styles.btnBox}>
                <Link to='/register'>
                    <button className={styles.btn}>Cadastrar</button>
                </Link>
                <Link to='/login'>
                    <button className={styles.btn}>Entrar</button>
                </Link>
            </div>
        </div>
    )
}

export default Home