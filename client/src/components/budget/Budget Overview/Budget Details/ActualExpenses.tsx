import type { PeriodInterface } from "../../../../interfaces/budget";
import { matchExpensesValues } from "../../../../api/expenses-api";
import toast from "react-hot-toast";

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
  const matchRedValuesHandler = async () => {
    const expensesTypes: string[] = [];
    selectedPeriod?.expenses.forEach((expense) => {
      if (expense.actualExpenses > expense.plannedExpenses) {
        expensesTypes.push(expense.expenseType);
      }
    });

    try {
      const updatedPeriod = await matchExpensesValues(
        selectedPeriod!._id,
        expensesTypes
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };

  const matchAllValuesHandler = async () => {
    const expensesTypes = selectedPeriod!.expenses.map(
      (expense) => expense.expenseType
    );

    try {
      const updatedPeriod = await matchExpensesValues(
        selectedPeriod!._id,
        expensesTypes
      );

      
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };
  return (
    <div className="w-[100%] py-2">
      {(expenseChangeDetection == true || expenseChangeDetection == false) &&
      selectedPeriod!.expenses.length > 0 ? (
        <>
          <ul className="px-2">
            {selectedPeriod!.expenses.map((expense, index) => (
              <li
                key={index}
                className={`flex justify-between g-1 p-1 ${
                  expense.actualExpenses <= expense.plannedExpenses
                    ? "bg-green-200"
                    : "bg-red-200"
                }`}
              >
                <div>{expense.expenseType}</div>
                <div>{expense.actualExpenses.toFixed(2)}</div>
              </li>
            ))}
            <li className="flex justify-between mt-1 p-1">
              <button
                className="w-[40%] text-red-600 underline"
                onClick={matchRedValuesHandler}
              >
                Match red values
              </button>
              <button
                className="w-[40%] underline"
                onClick={matchAllValuesHandler}
              >
                Match all values
              </button>
            </li>
          </ul>
        </>
      ) : (
        <p>No expenses added yet</p>
      )}
    </div>
  );
}
