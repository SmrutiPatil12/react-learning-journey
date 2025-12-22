import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [expenses, setExpenses] = useState([])

  const isFirstLoad = useRef(true)

  // ✅ Load from localStorage (only once)
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }
  }, [])

  // ✅ Save to localStorage (skip first render)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  const totalExpense = expenses.reduce((total, item) => {
    return total + item.amount
  }, 0)

  const addExpenses = () => {
      if (title.trim() === "" || amount <= 0) return

      setExpenses([
        ...expenses,
        {
          title,
          amount: Number(amount)
        }
      ])

      setTitle("")
      setAmount("")
    }
    const deleteExpense = (indexToDelete) => {
    const updatedExpenses = expenses.filter(
      (_, index) => index !== indexToDelete
    )
    setExpenses(updatedExpenses)
  }

  return (
    <div className="container">
      <h1>Expense Tracker App</h1>

      <h2>Total Expenses: ₹{totalExpense}</h2>

      <input
        type="text"
        placeholder="Expense name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Expense amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addExpenses}>
        Add Expense
      </button>

      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <span>{expense.title}</span>
            <span>₹{expense.amount}</span>
            <button
              className="delete-btn"
              onClick={() => deleteExpense(index)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
