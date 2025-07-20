import { useEffect } from "react";
import type { PeriodInterface } from "../../../../interfaces/budget";

interface ActualExpensesProps {
  selectedPeriod: PeriodInterface | undefined;
  setPeriods: Function;
  expenseChangeDetection: boolean;
}

export default function ActualExpenses({
  selectedPeriod,
  setPeriods,
  expenseChangeDetection,
}: ActualExpensesProps) {
  return (
    <div className="w-[100%] py-2">
      {(expenseChangeDetection == true || expenseChangeDetection == false) &&
      selectedPeriod!.expenses.length > 0 ? (
        <ul className="px-2">
          {selectedPeriod!.expenses.map((expense, index) => (
            <li key={index} className="flex justify-between g-1">
              <div>{expense.expenseType}</div>
              <div>{expense.actualExpenses.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses added yet</p>
      )}
    </div>
  );
}
