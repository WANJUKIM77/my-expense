import type {Expense} from '../types/expense'

interface ExpenseListProps {
    expenses: Expense[]
    onDeleteExpense: (id:number) => void
}

function ExpenseList ({
    expenses,
    onDeleteExpense,
} : ExpenseListProps) {
    return (
        <section>

        <h3>최근 지출</h3>

        <ul className='expense-list'>
            {expenses.map((expense) => (
                <li key={expense.id}>
                    <span>{expense.date}</span>
                    <span>{expense.category}</span>
                    <span>{expense.title}</span>
                    <span>{expense.amount.toLocaleString()}원</span>

                    <button
                    className='delete-btn'
                    type="button"
                    onClick={() => onDeleteExpense(expense.id)}
                    >삭제</button>
                </li>
            ))}
        </ul>
        </section>
    )
}

export default ExpenseList