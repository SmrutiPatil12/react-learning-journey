import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [status, setStatus] = useState("Applied")
  const [filter, setFilter] = useState("All")
  const [jobs, setJobs] = useState([])

  // Load from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs")
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs))
  }, [jobs])

  const filteredJobs = filter === "All" ? jobs : jobs.filter(job => job.status === filter)
  const addJob = () => {
    if (company.trim() === "" || role.trim() === "") return

    setJobs([
      ...jobs,
      { company, role, status }
    ])

    setCompany("")
    setRole("")
    setStatus("Applied")
  }

  const deleteJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index)
    setJobs(updatedJobs)
  }

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>

      <div className="form">
        <input
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          placeholder="Job role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Selected</option>
        </select>

        <button onClick={addJob}>Add Job</button>
      </div>

      <h2>Total Applications: {jobs.length}</h2>
      <div className="filters">
        {["All", "Applied", "Interview", "Rejected", "Selected"].map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <ul className="job-list">
        {jobs.map((job, index) => (
          <li key={index} className={`job ${job.status.toLowerCase()}`}>
            <div>
              <strong>{job.company}</strong>
              <p>{job.role}</p>
              <span>{job.status}</span>
            </div>
            <button onClick={() => deleteJob(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
