import { useState , useEffect } from "react";
import axios from "axios";

function TasksAPI() {
    const [tasks, setTasks] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getTasks = async () => {
            const res = await axios.get('/api/task/')
            setTasks(res.data)
        }

        getTasks()
    }, [callback])
    return {
        tasks: [tasks, setTasks],
        callback: [callback, setCallback]
    }
}

export default TasksAPI