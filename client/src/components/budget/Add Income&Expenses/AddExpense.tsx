import { useState } from "react";
import type { PeriodInterface } from "../../../interfaces/budget";
import toast from "react-hot-toast";
import { addActualExpense } from "../../../api/expenses-api";

interface AddExpenseProps {
  currPeriod: PeriodInterface | undefined;
  setPeriods: Function;
}

export default function AddExpense({
  currPeriod,
  setPeriods,
}: AddExpenseProps) {
  const [inputValue, setInputValue] = useState<number | string>("0");
  const [selectedExpenseType, setSelectedExpenseType] = useState<string>(
    currPeriod!.expenses.length > 0 ? currPeriod!.expenses[0].expenseType : ""
  );

  const addValueHandler = async () => {
    if (inputValue == "" || Number(inputValue) <= 0) {
      return;
    }
    const expenseToAdd = Number(inputValue);

    try {
      await addActualExpense(
        currPeriod!._id,
        selectedExpenseType,
        expenseToAdd
      );
      setPeriods((periods: PeriodInterface[]) => {
        const findPeriod = periods.find(
          (period) => period._id == currPeriod!._id
        );
        const findExpense = findPeriod?.expenses.find(
          (expense) => expense.expenseType == selectedExpenseType
        );
        findExpense!.actualExpenses += Number(expenseToAdd);
        return periods;
      });

      setInputValue("");
      toast.success("Expense successfully added!");
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-self-center gap-8 w-[70%] p-7 bg-white rounded">
        {currPeriod!.expenses.length > 0 ? (
          <>
            <select
              name="expenseType"
              id="expenseType"
              onChange={(e) => setSelectedExpenseType(e.target.value)}
            >
              {currPeriod!.expenses.map((expense, index) => (
                <option key={index} value={expense.expenseType}>
                  {expense.expenseType}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={inputValue}
              onFocus={() => setInputValue("")}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="w-[70px] p-2 bg-green-200 rounded self-center"
              onClick={addValueHandler}
              data-testid="add-expense-button"
            >
              Add
            </button>
          </>
        ) : (
          <p className="text-center">No Planned Expenses added yet!</p>
        )}
      </div>
    </div>
  );
}
