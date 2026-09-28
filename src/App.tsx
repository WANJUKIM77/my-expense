import './App.css'

import { useEffect ,useState } from 'react'
import type { Expense } from './types/expense'
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import ExpenseSummary from './components/ExpenseSummary'

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saveExpenses = localStorage.getItem('expenses')
    
    if (saveExpenses) {
      return JSON.parse(saveExpenses)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem(
      'expenses',
      JSON.stringify(expenses)
    )
  }, [expenses])

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      expense,
    ])
  }

  const handleDeleteExpense = (id:number) => {
    setExpenses((prevExpenses) => 
    prevExpenses.filter((expenses) => expenses.id !== id))
  }

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  )
  return (

    <main>
      <h2>MY EXPENSE</h2>
      <p className='sub-title'>개인 지출 관리</p>

      <p>총 지출: {totalAmount.toLocaleString()}원({expenses.length}건)</p>
      <ExpenseSummary expenses={expenses}/>
      {expenses.length > 0 &&
      <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense}/>
      }
      <ExpenseForm onAddExpense={handleAddExpense} />
    </main>
  )
}

export default App
