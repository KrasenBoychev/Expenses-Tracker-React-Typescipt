import { useEffect, useState } from "react";
import type {
  BudgetAndPeriodsPropsInterface,
  PeriodInterface,
} from "../../interfaces/budget";

export default function BudgetOverview({
  budget,
  periods,
}: BudgetAndPeriodsPropsInterface) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodInterface>(
    periods![0]
  );
  console.log(periods);
  
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
    // <!-- Features -->
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* <!-- Grid --> */}
      <div className="grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
        {/* <!-- Stats --> */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-white uppercase">
            Income
          </h4>
          <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">
            {selectedPeriod?.income}
          </p>
        </div>
        {/* <!-- End Stats --> */}

        {/* <!-- Stats --> */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-white uppercase">
            Planned to spend
          </h4>
          <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">
            {plannedExpenses}
          </p>
        </div>
        {/* <!-- End Stats --> */}

        {/* <!-- Stats --> */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-white uppercase">
            Planned to save
          </h4>
          <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">
            {savings}
          </p>
        </div>
        {/* <!-- End Stats --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
    // <!-- End Features -->
  );
}
