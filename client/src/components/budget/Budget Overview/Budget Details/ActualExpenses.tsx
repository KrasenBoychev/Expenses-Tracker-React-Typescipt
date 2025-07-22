import type { PeriodInterface } from "../../../../interfaces/budget";
import { matchExpensesValues } from "../../../../api/expenses-api";
import toast from "react-hot-toast";
import BudgetAddIncomeExpense from "../../Add Income&Expenses/BudgetAddIncomeExpense";
import { useEffect, useState } from "react";

interface ActualExpensesProps {
  selectedPeriod: PeriodInterface | undefined;
  setPeriods: Function;
  expenseChangeDetection: boolean;
  setExpenseChangeDetection: Function;
  setUpdateTotalSavings: Function;
}

export default function ActualExpenses({
  selectedPeriod,
  setPeriods,
  expenseChangeDetection,
  setExpenseChangeDetection,
  setUpdateTotalSavings,
}: ActualExpensesProps) {
  const [redValuesCounter, setRedValuesCounter] = useState<number>(0);
  const [otherValuesCounter, setOtherValuesCounter] = useState<number>(0);

  useEffect(() => {
    let redValues = 0;
    let otherValues = 0;

    selectedPeriod!.expenses.forEach((expense) => {
      if (expense.actualExpenses > expense.plannedExpenses) {
        redValues += 1;
      } else if (expense.actualExpenses < expense.plannedExpenses) {
        otherValues += 1;
      }
    });

    setRedValuesCounter(redValues);
    setOtherValuesCounter(otherValues);
  }, [expenseChangeDetection]);

  const matchValuesHandler = async (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      id: string;
    };

    let expensesTypes: string[] = [];
    if (target.id == "redValues") {
      selectedPeriod?.expenses.forEach((expense) => {
        if (expense.actualExpenses > expense.plannedExpenses) {
          expensesTypes.push(expense.expenseType);
        }
      });
    } else if (target.id == "allValues") {
      expensesTypes = selectedPeriod!.expenses.map(
        (expense) => expense.expenseType
      );
    }

    try {
      const updatedPeriod: PeriodInterface = await matchExpensesValues(
        selectedPeriod!._id,
        expensesTypes
      );

      setPeriods((periods: PeriodInterface[]) => {
        const findPeriod = periods.find(
          (period) => period._id == selectedPeriod!._id
        );
        findPeriod!.expenses = updatedPeriod.expenses;
        return periods;
      });

      setExpenseChangeDetection((prev: boolean) => !prev);
      setUpdateTotalSavings((prev: boolean) => !prev);
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
            {selectedPeriod!.expenses.map((expense) => (
              <li
                key={expense.expenseType}
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
              {redValuesCounter > 0 && (
                <button
                  className="w-[40%] text-red-600 underline"
                  id="redValues"
                  onClick={matchValuesHandler}
                >
                  Match red values
                </button>
              )}

              {otherValuesCounter > 0 && (
                <button
                  className="w-[40%] underline"
                  id="allValues"
                  onClick={matchValuesHandler}
                >
                  Match all values
                </button>
              )}
            </li>
          </ul>
        </>
      ) : (
        <p>No expenses added yet</p>
      )}
    </div>
  );
}
