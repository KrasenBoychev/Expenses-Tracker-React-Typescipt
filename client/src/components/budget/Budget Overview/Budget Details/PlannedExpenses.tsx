import { useState } from "react";
import type { PeriodInterface } from "../../../../interfaces/budget";
import toast from "react-hot-toast";
import { addPlannedExpenseType } from "../../../../api/expenses-api";

interface PlannedExpensesProps {
  selectedPeriod: PeriodInterface | undefined;
  setPeriods: Function;
}

export default function PlannedExpenses({
  selectedPeriod,
  setPeriods,
}: PlannedExpensesProps) {
  const [newPlannedExpenseType, setNewPlannedExpenseType] =
    useState<string>("");

  const addPlannedExpenseTypeHandler = async () => {
    if (newPlannedExpenseType == "") {
      return;
    }

    const existingExpenseType = selectedPeriod!.plannedExpenses.find(
      (expense) => expense.expenseType == newPlannedExpenseType
    );

    if (existingExpenseType) {
      toast.error("Expense Type already exists!");
      return;
    }
    try {
      await addPlannedExpenseType(newPlannedExpenseType, selectedPeriod!._id);
      setPeriods((periods: PeriodInterface[]) => {
        const findPeriod = periods.find((period) => period.endDate == null);
        findPeriod!.plannedExpenses.push({
          expenseType: newPlannedExpenseType,
          value: 0,
        });
        return periods;
      });

      setNewPlannedExpenseType("");
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };

  return (
    <div className="w-[100%] py-2">
      <ul className="px-2">
        {selectedPeriod!.plannedExpenses.map((expense, index) => (
          <li key={index} className="flex justify-between g-2">
            <div>{expense.expenseType}</div>
            <div>{expense.value.toFixed(2)}</div>
          </li>
        ))}
        {selectedPeriod!.endDate == null && (
          <li key={"newExpenseType"} className="flex justify-between mt-2">
            <input
              className="w-[85%] h-[25px] pl-1"
              type="text"
              value={newPlannedExpenseType}
              onChange={(e) => setNewPlannedExpenseType(e.target.value)}
            />
            <button
              className="px-1.5 bg-green-300 rounded"
              onClick={addPlannedExpenseTypeHandler}
            >
              add
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
