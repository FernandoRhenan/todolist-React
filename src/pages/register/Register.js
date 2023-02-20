import styles from '../forms.module.css'
import useAuthentication from '../../hooks/useAuthentication'
import { useState, useEffect } from 'react'

const Register = () => {

    const { register, error: authError, loading } = useAuthentication()

    const [error, setError] = useState(null)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    function handleSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError('As senhas devem ser iguais')
            return
        }

        if (name === '' || email === '' || password === '') {
            setError('Preencha todos os campos')
            return
        }

        let user = {
            name, email, password
        }
        register(user)
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
                    <span>Digite seu nome:</span>
                    <input type='text' value={name} onChange={(e) => {
                        setName(e.target.value)
                        setError(null)
                    }} />
                </label>
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
                <label>
                    <span>Confirme sua senha:</span>
                    <input type='password' value={confirmPassword} onChange={(e) => {
                        setConfirmPassword(e.target.value)
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

export default Register