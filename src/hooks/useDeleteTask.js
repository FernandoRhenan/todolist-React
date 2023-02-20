import { useEffect, useState } from "react"
import { db } from '../services/firebaseConfig'
import { doc, deleteDoc } from "firebase/firestore";


const useDeleteTask = () => {

    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }


    const deleteTask = async (id, user) => {
        checkIfIsCancelled()
        try {

            await deleteDoc(doc(db, user.uid, id));

        } catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        deleteTask
    }

}

export default useDeleteTask