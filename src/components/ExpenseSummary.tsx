import type { Expense } from "../types/expense";

interface ExpenseSummaryProps {
    expenses:Expense[]
}

function ExpenseSummary({expenses}: ExpenseSummaryProps) {
    const categories = ['식비', '교통', '쇼핑', '기타']

    return (
        <section className="category">
            <h3>카테고리별 지출</h3>

            <ul>
                {categories.map((category) => {
                    const total = expenses
                    .filter((expense) => expense.category === category)
                    .reduce((sum, expense) => sum + expense.amount, 0)

                    return(
                        <li key={category}>
                            <span>{category}</span>
                            <span>{total.toLocaleString()}원</span>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}


export default ExpenseSummary