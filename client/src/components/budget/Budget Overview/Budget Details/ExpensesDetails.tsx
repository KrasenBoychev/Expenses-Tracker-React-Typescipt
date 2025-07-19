import type { ExpenseInterface } from "../../../../interfaces/budget";

interface ExpensesDetailsProps {
  expenses: ExpenseInterface[];
}

export default function ExpensesDetails({ expenses }: ExpensesDetailsProps) {
  return (
    <div className="w-[100%] py-2">
      {expenses.length > 0 ? (
        <ul className="px-2">
          {expenses.map((expense, index) => (
            <li key={index} className="flex justify-between g-1">
              <div>{expense.expenseType}</div>
              <div>{expense.value}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses added yet</p>
      )}
    </div>
  );
}
