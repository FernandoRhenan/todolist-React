import styles from './TaskList.module.css'
import { useContext, useEffect, useState } from "react"
import useUpdateTask from '../../hooks/useUpdateTask';
import useDeleteTask from '../../hooks/useDeleteTask';
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../services/firebaseConfig"
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ColorContext } from '../../context/ColorContext'

import { IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoCheckmarkCircleOutline, IoCheckmarkCircleSharp, IoTrashOutline } from 'react-icons/io5'

const TaskList = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const [newList, setNewList] = useState([])
    
    const { updateUp, updateDone } = useUpdateTask()
    const { deleteTask } = useDeleteTask()

    const user = useContext(AuthContext)
    const {themeColor, letterColor} = useContext(ColorContext)

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }
    useEffect(() => {
        async function getTasks() {
            checkIfIsCancelled()
            setError(null)
            setLoading(true)
            try {
                const q = await query(collection(db, user.uid), where("taskValue", "!=", "null"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const list = [];
                    querySnapshot.forEach((doc) => {
                        list.push(doc.data());
                        list.sort((a, b) => {
                            if (a.up && !b.up) {
                                return -1
                            }
                            if (!a.up && b.up) {
                                return 1
                            }
                        })
                    })
                    setNewList(list)
                });
            } catch (err) {
                console.log(err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        getTasks()
    }, [])



    useEffect(() => {
        return () => setCancelled(true);
    }, [])
    return (
        <div className={styles.taskList}>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            <ul>
                {newList && newList.map((item, i) => (


                    <li key={i} style={{backgroundColor: `${themeColor}`, color: `${letterColor}`}}>
                        <span className={styles.task} style={item.done ? { textDecoration: "line-through"} : { undefined }}>{item.taskValue}</span>
                        <span className={styles.spanIcons}>

                            <span onClick={() => { updateUp(item.id, item.up, user) }} style={item.up ? { color: `${letterColor}` } : { undefined }}>
                               {item.up ? <IoArrowUpCircleSharp /> : <IoArrowUpCircleOutline /> } 
                            </span>

                            <span onClick={() => { updateDone(item.id, item.done, user) }} style={item.done ? { color: `${letterColor}` } : { undefined }}>
                                {item.done ? <IoCheckmarkCircleSharp /> : <IoCheckmarkCircleOutline /> }
                            </span>

                            <span onClick={() => { deleteTask(item.id, user) }} className={styles.trashIcon}>
                                <IoTrashOutline />
                            </span>
                        </span>
                    </li>

                ))}

            </ul>
        </div>
    )
}

export default TaskList