import styles from '../forms.module.css'
import useAuthentication from '../../hooks/useAuthentication'
import { useState, useEffect } from 'react'


const Login = () => {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const { login, loading, error: authError } = useAuthentication()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')

        if (password && email !== '') {
            const user = {
                email,
                password
            }
            await login(user)
        } else {
            setError('Preencha todos os campos')
        }

    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Digite seu e-mail:</span>
                    <input type='email' value={email} onChange={(e) => {
                        setEmail(e.target.value)
                        setError(null)
                    }} />
                </label>
                <label>
                    <span>Digite sua senha:</span>
                    <input type='password' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                        setError(null)
                    }} />
                </label>
                {loading ? (<button disabled className={styles.btn}>Aguarde</button>) : (<button className={styles.btn}>Enviar</button>)}
            </form>
            {error &&
                <p className='error'>{error}</p>
            }
        </div>
    )
}

export default Login