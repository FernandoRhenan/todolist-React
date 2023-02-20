import { useEffect, useState } from "react"
import { db } from '../services/firebaseConfig'
import { doc, updateDoc } from "firebase/firestore";


const useUpdateTask = () => {

    const [cancelled, setCancelled] = useState(false)

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }


    const updateUp = async (id, up, user) => {
        checkIfIsCancelled()
    
        try {

            const ref = doc(db, user.uid, id);

            await updateDoc(ref, {
              up: !up
            });

        } catch (err) {
            console.log(err)
        }
    }

    const updateDone = async (id, done, user) => {
        checkIfIsCancelled()
       
        try {

            const ref = doc(db, user.uid, id);

            await updateDoc(ref, {
              done: !done
            });

        } catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        updateUp,
        updateDone
    }

}

export default useUpdateTask