import { db } from '../services/firebaseConfig'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth'

import { useState, useEffect } from 'react'

const useAuthentication = () => {

    const auth = getAuth()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

 
    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }
    const register = async (data) => {
        checkIfIsCancelled()
        setError(null)
        setLoading(true)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.name
            })
            setLoading(false)
            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage = null;

            if (error.message.includes('Password')) {
                systemErrorMessage = "A senha deve conter no minimo 6 caracteres"
            } else if (error.message.includes('email-already')) {
                systemErrorMessage = "E-mail já cadastrado"
            } else if (error.message.includes('invalid-email')) {
                systemErrorMessage = "E-mail mal formatado."
            } else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde'
            }

            setError(systemErrorMessage)
            setLoading(false)
        }

    }

    const login = async (data) => {

        checkIfIsCancelled()
        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(true)

        } catch (error) {

            let systemErrorMessage;

            if (error.message.includes('user-not-found')) {
                systemErrorMessage = 'Usuário não encontrado'
            } else if (error.message.includes('wrong-password')) {
                systemErrorMessage = 'A senha está incorreta'
            } else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde'
            }
            setLoading(true)

        }

    }

    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }


    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        register,
        logout,
        login,
        auth,
        loading,
        error
    }


}

export default useAuthentication