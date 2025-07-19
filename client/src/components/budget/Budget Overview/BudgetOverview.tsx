import { useState } from "react";
import type {
  BudgetInterface,
  PeriodInterface,
} from "../../../interfaces/budget";
import SelectPeriod from "./SelectPeriod";
import Stats from "./Stats";
import Options from "./Options";
import BudgetDetails from "./Budget Details/BudgetDetails";

interface BudgetOverviewProps {
  budget: BudgetInterface | null;
  periods: PeriodInterface[] | null;
}

export default function BudgetOverview({
  budget,
  periods,
}: BudgetOverviewProps) {
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
