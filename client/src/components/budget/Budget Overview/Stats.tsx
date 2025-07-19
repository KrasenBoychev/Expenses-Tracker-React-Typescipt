import { useEffect, useState } from "react";
import type { PeriodInterface } from "../../../interfaces/budget";
interface StatsProps {
  selectedPeriod: PeriodInterface;
}

export default function Stats({ selectedPeriod }: StatsProps) {
  const [plannedExpenses, setPlannedExpenses] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);

  useEffect(() => {
    if (selectedPeriod && selectedPeriod.plannedExpenses.length > 0) {
      let plannedExpensesCounter: number = 0;
      selectedPeriod.plannedExpenses.forEach((expense) => {
        plannedExpensesCounter += expense.value;
      });
      setPlannedExpenses(plannedExpensesCounter);
      setSavings(selectedPeriod.income - plannedExpenses);
    }
  }, [selectedPeriod]);
  return (
    <div className="max-w-[85rem] py-20 mx-auto">
      <div className="grid grid-cols-3 gap-30">
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-white uppercase">
            Income
          </h4>
          <p className="mt-2 sm:mt-3 text-2xl sm:text-6xl font-bold text-blue-600">
            {selectedPeriod?.income}
          </p>
        </div>
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-white uppercase">
            Planned to spend
          </h4>
          <p className="mt-2 sm:mt-3 text-2xl sm:text-6xl font-bold text-blue-600">
            {plannedExpenses}
          </p>
        </div>
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-white uppercase">
            Planned to save
          </h4>
          <p className="mt-2 sm:mt-3 text-2xl sm:text-6xl font-bold text-blue-600">
            {savings}
          </p>
        </div>
      </div>
    </div>
  );
}
