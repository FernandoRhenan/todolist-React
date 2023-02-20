import styles from './TaskForm.module.css'
import { IoArrowUpCircleOutline, IoArrowUpCircle, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { useContext, useState } from 'react'
import useSetTask from '../../hooks/useSetTask'
import { ColorContext } from '../../context/ColorContext'

const TaskForm = ({ user }) => {

    const {themeColor, letterColor} = useContext(ColorContext)

    const {setTask} = useSetTask()

    const [taskValue, setTaskValue] = useState('')
    const [up, setUp] = useState(false)

    function handleClick() {
        if (taskValue !== '') {
            let data = { taskValue, up, user }
            setTask(data)
            setTaskValue('')
        }
    }

    return (
        <div className={styles.taskForm}>
            <div>
                {up ? <IoArrowUpCircle style={{color: `${themeColor}`}} className={styles.up} onClick={() => { setUp(false) }} /> : <IoArrowUpCircleOutline style={{color: `${themeColor}`}} className={styles.up} onClick={() => { setUp(true) }} />}
                <input type='text' style={{backgroundColor: `${themeColor}`, color: `${letterColor}`}} value={taskValue} onChange={(e) => { setTaskValue(e.target.value) }} />
                <IoCheckmarkCircleOutline style={{color: `${themeColor}`}} className={styles.send} onClick={handleClick} />
            </div>

        </div>
    )
}

export default TaskForm