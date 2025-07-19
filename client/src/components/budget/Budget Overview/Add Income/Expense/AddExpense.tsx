import { useState } from "react";
import type { PeriodInterface } from "../../../../../interfaces/budget";

interface AddExpenseProps {
  currPeriod: PeriodInterface | undefined;
}

export default function AddExpense({ currPeriod }: AddExpenseProps) {
  const [inputValue, setInputValue] = useState<number | string>("0");
  const [selectedExpenseType, setSelectedExpenseType] = useState<string>(
    currPeriod!.plannedExpenses.length > 0
      ? currPeriod!.plannedExpenses[0].expenseType
      : ""
  );

  const addValueHandler = async () => {
    
  };
  return (
    <div>
      <div className="flex flex-col justify-self-center gap-8 w-[70%] p-7 bg-white rounded">
        <select
          name="expenseType"
          id="expenseType"
          onChange={(e) => setSelectedExpenseType(e.target.value)}
        >
          {currPeriod!.plannedExpenses.map((expense, index) => (
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
        >
          Add
        </button>
      </div>
    </div>
  );
}
