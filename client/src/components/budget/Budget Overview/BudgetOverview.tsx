import { useEffect, useState } from "react";
import type {
  BudgetAndPeriodsPropsInterface,
  PeriodInterface,
} from "../../../interfaces/budget";
import SelectPeriod from "./SelectPeriod";
import Stats from "./Stats";
import Options from "./Options";
import BudgetDetails from "./Budget Details/BudgetDetails";

export default function BudgetOverview({
  budget,
  periods,
}: BudgetAndPeriodsPropsInterface) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodInterface>(
    periods![0]
  );

  const [budgetDetails, setBudgetDetails] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full mt-10 ml-[150px] text-center">
      {budgetDetails ? (
        <BudgetDetails selectedPeriod={selectedPeriod} />
      ) : (
        <>
          <SelectPeriod selectedPeriod={selectedPeriod} periods={periods} />
          <Stats selectedPeriod={selectedPeriod} />
          <Options
            selectedPeriod={selectedPeriod}
            setBudgetDetails={setBudgetDetails}
          />
        </>
      )}
    </div>
  );
}
