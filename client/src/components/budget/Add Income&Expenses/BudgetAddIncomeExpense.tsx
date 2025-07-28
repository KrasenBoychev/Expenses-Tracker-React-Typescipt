import { useState } from "react";
import type { PeriodInterface } from "../../../interfaces/budget";
import AddIncome from "./AddIncome";
import AddExpense from "./AddExpense";

interface BudgetAddIncomeExpenseProps {
  periods: PeriodInterface[] | null;
  setPeriods: Function;
  setUpdateTotalSavings: Function;
}

export default function BudgetAddIncomeExpense({
  periods,
  setPeriods,
  setUpdateTotalSavings,
}: BudgetAddIncomeExpenseProps) {
  const [optionSelected, setOptionSelected] = useState<string>("addIncome");
  const currPeriod = periods!.find((period) => period.endDate == null);

  return (
    <div className="flex flex-col justify-center gap-20 w-full h-full mt-10 ml-[150px] mx-auto text-black">
      <div className="flex justify-center gap-50 w-full">
        <div
          className={`p-5 bg-white rounded hover:cursor-pointer ${
            optionSelected != "addIncome" && "opacity-80"
          }`}
          onClick={() => setOptionSelected("addIncome")}
        >
          Add Income
        </div>
        <div
          className={`p-5 bg-white rounded hover:cursor-pointer ${
            optionSelected != "addExpense" && "opacity-80"
          }`}
          onClick={() => setOptionSelected("addExpense")}
        >
          Add Expense
        </div>
      </div>
      {optionSelected == "addIncome" && (
        <AddIncome
          currPeriod={currPeriod}
          setPeriods={setPeriods}
          setUpdateTotalSavings={setUpdateTotalSavings}
        />
      )}
      {optionSelected == "addExpense" && (
        <AddExpense currPeriod={currPeriod} setPeriods={setPeriods} />
      )}
    </div>
  );
}
