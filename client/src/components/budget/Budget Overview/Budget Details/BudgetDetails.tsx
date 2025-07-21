import { useState } from "react";
import type { PeriodInterface } from "../../../../interfaces/budget";
import ActualExpenses from "./ActualExpenses";
import PlannedExpenses from "./PlannedExpenses";
interface BudgetDetailsProps {
  selectedPeriod: PeriodInterface | undefined;
  setBudgetDetails: Function;
  setPeriods: Function;
  setUpdateTotalSavings: Function;
}

export default function BudgetDetails({
  selectedPeriod,
  setBudgetDetails,
  setPeriods,
  setUpdateTotalSavings,
}: BudgetDetailsProps) {
  const [expenseChangeDetection, setExpenseChangeDetection] =
    useState<boolean>(false);
  return (
    <div className="flex gap-10 w-[100%]">
      <div
        className="absolute top-[10px] left-[300px] p-1 bg-white text-black rounded hover:cursor-pointer"
        onClick={() => setBudgetDetails((prev: boolean) => !prev)}
      >
        <i className="fa-solid fa-backward-step fa-sm px-1"></i>
      </div>
      <div className="w-[50%] bg-gray-100 text-black">
        <div className="flex justify-center gap-1 p-2 border-b-1 border-black">
          <h5 className="text-xl">Planned Expenses</h5>
        </div>
        <PlannedExpenses
          selectedPeriod={selectedPeriod}
          setPeriods={setPeriods}
          expenseChangeDetection={expenseChangeDetection}
          setExpenseChangeDetection={setExpenseChangeDetection}
          setUpdateTotalSavings={setUpdateTotalSavings}
        />
      </div>
      <div className="w-[50%] bg-gray-200 text-black">
        <div className="flex justify-center gap-1 p-2 border-b-1 border-black">
          <h5 className="text-xl">Actual Expenses</h5>
        </div>
        <ActualExpenses
          selectedPeriod={selectedPeriod}
          setPeriods={setPeriods}
          expenseChangeDetection={expenseChangeDetection}
          setExpenseChangeDetection={setExpenseChangeDetection}
          setUpdateTotalSavings={setUpdateTotalSavings}
        />
      </div>
    </div>
  );
}
