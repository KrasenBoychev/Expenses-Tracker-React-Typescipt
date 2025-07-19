import type { PeriodInterface } from "../../../../interfaces/budget";

interface ActualExpensesProps {
  selectedPeriod: PeriodInterface | undefined;
  setPeriods: Function
}

export default function ActualExpenses({
  selectedPeriod,
  setPeriods,
}: ActualExpensesProps) {
  return (
    <div className="w-[100%] py-2">
      {selectedPeriod!.actualExpenses.length > 0 ? (
        <ul className="px-2">
          {selectedPeriod!.actualExpenses.map((expense, index) => (
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
