import styles from './Tasks.module.css'
import Header from '../../components/header/Header'
import TaskForm from '../../components/taskForm/TaskForm'
import TaskList from '../../components/taskList/TaskList'
import ColorProvider from '../../context/ColorContext'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../services/firebaseConfig';
import { AuthContext } from '../../context/AuthContext'
import { useContext, useState } from 'react'

const Tasks = () => {

    const [imageUrl, setImageUrl] = useState('')
    const [color, setColor] = useState('')
    const [themeColor, setThemeColor] = useState('')
    const [letterColor, setLetterColor] = useState('')

    const user = useContext(AuthContext)

    const unsub = onSnapshot(doc(db, user.uid, "background"), (doc) => {
        setImageUrl(doc.data().url);
        setColor(doc.data().color);
        setThemeColor(doc.data().themeColor)
        setLetterColor(doc.data().letterColor)
    });

    return (
        <div className={styles.tasks} style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundColor: undefined } : { backgroundImage: undefined, backgroundColor: color }}>
            <ColorProvider value={{themeColor, letterColor}}>
                <Header user={user} />
                <TaskForm user={user} />
                <TaskList />
            </ColorProvider>
        </div>
    )
}

export default Tasks