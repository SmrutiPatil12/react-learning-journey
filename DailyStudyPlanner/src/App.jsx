import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (task.trim() === "") return
    setTasks([...tasks, { text: task, completed: false }])
    setTask("")
  }

  const toggleTask = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    )
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h1>Study Planner</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <br/>
      <br/>

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(i)}
            />
            {t.text}
            <button onClick={() => deleteTask(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
