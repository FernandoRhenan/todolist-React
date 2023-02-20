import { useEffect, useState } from "react"
import { db } from '../services/firebaseConfig'
import { collection, addDoc, setDoc, doc } from "firebase/firestore";


const useSetTask = () => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }


    const setTask = async (data) => {
        checkIfIsCancelled()
        setError(null)
        setLoading(true)
        try {
            const { taskValue, up, user } = data

            const docRef = await addDoc(collection(db, user.uid), {
                taskValue,
                up,
                done: false
            });

            let docId = docRef.id;

            await setDoc(doc(db, user.uid, docId),
                {
                    id: docId
                },
                 { merge: true })
        } catch (err) {
            console.log(err)
            setError(err)
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        setTask,
        error,
        loading
    }

}

export default useSetTask