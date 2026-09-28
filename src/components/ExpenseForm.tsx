import { useState } from 'react'
import type { Expense } from '../types/expense'

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('식비')
   const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) {
      setError('지출 내용을 입력해주세요.')
      return
    }
    if (!amount || Number(amount) <= 0) {
      setError('금액을 올바르게 입력해주세요.')
      return
    }

    if (!date) {
      setError('날짜를 선택해주세요.')
      return
    }

    const newExpense: Expense = {
      id: Date.now(),
      title:title.trim(),
      amount: Number(amount),
      category,
      date,
    }
    
    onAddExpense(newExpense)
    
    setTitle('')
    setAmount('')
    setCategory('식비')
    setDate('')
    setError('')
}
const onClickAddBtn = () => {
    setIsOpen(!isOpen)
}

  return (
    <section className='form'>
      <p className='add-btn' onClick={onClickAddBtn}>지출 추가
        {isOpen ? (
            <span>x</span>
        ) : (
            <span>+</span>
        )
        }
      </p>
      {isOpen === true &&

        <form onSubmit={handleSubmit}>
            <div className='detail-contents'>
                <label htmlFor='expense-title' className='contents-title'>
                    지출 내용
                </label>
                <input
                id="expense-title"
                type="text"
                placeholder="예: 점심"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                />
                <input
                id='expense-amount'
                type="number"
                min="1"
                placeholder='예: 12000'
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                />
    </div>
    <div className='detail-category'>
        <label htmlFor='expense-category' className='category-title'>
            카테고리
        </label>
            <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            >
            <option value="식비">식비</option>
            <option value="교통">교통</option>
            <option value="쇼핑">쇼핑</option>
            <option value="기타">기타</option>
            </select>
        </div>
    <div className='detail-date'>
        <label htmlFor="expense-date">
            날짜
        </label>

        <input
            id="expense-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
        />
    </div>

            {error && (
            <p role="alert">
                {error}
            </p>
            )}

            <button type="submit" className='add'>
            추가
            </button>
        </form>
      }
    </section>
  )
}

export default ExpenseForm