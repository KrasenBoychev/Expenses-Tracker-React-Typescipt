import { useEffect, useState } from "react";
import type { PeriodInterface } from "../../../interfaces/budget";
interface StatsProps {
  selectedPeriod: PeriodInterface | undefined;
}

export default function Stats({ selectedPeriod }: StatsProps) {
  const [plannedExpenses, setPlannedExpenses] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);

  useEffect(() => {
    if (selectedPeriod && selectedPeriod.expenses.length > 0) {
      let plannedExpensesCounter: number = 0;
      selectedPeriod.expenses.forEach((expense) => {
        plannedExpensesCounter += expense.plannedExpenses;
      });
      setPlannedExpenses(plannedExpensesCounter);
      setSavings(selectedPeriod.income - plannedExpensesCounter);
    }
  }, [selectedPeriod]);
  return (
    <div className="max-w-[800px] py-15 mx-auto">
      <div className="flex flex-col flex-wrap gap-20">
        <div>
          <h4 className="text-2xl font-semibold text-white uppercase">
            Income
          </h4>
          <p className="text-4xl font-bold text-green-400">
            {selectedPeriod!.income.toFixed(2)}
          </p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-white uppercase">
            Planned to spend
          </h4>
          <p className="text-4xl font-bold text-orange-400">
            {plannedExpenses.toFixed(2)}
          </p>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-white uppercase">
            Planned to save
          </h4>
          <p className="text-4xl font-bold text-yellow-400">
            {savings.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
