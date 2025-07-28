import { useState } from "react";
import type {
  BudgetInterface,
  PeriodInterface,
} from "../../../interfaces/budget";
import SelectPeriod from "./SelectPeriod";
import Stats from "./Stats";
import Options from "./Options/Options";
import BudgetDetails from "./Budget Details/BudgetDetails";

interface BudgetOverviewProps {
  budget: BudgetInterface | null;
  periods: PeriodInterface[] | null;
  setPeriods: Function;
  setUpdateTotalSavings: Function;
}

export default function BudgetOverview({
  budget,
  periods,
  setPeriods,
  setUpdateTotalSavings,
}: BudgetOverviewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<
    PeriodInterface | undefined
  >(periods!.find((period) => period.endDate == null));

  const [budgetDetails, setBudgetDetails] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full mt-10 ml-[150px] text-center">
      {budgetDetails ? (
        <BudgetDetails
          selectedPeriod={selectedPeriod}
          setBudgetDetails={setBudgetDetails}
          setPeriods={setPeriods}
          setUpdateTotalSavings={setUpdateTotalSavings}
        />
      ) : (
        <>
          <SelectPeriod
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            periods={periods}
          />
          <Stats selectedPeriod={selectedPeriod} />
          <Options
            budget={budget}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            setPeriods={setPeriods}
            setBudgetDetails={setBudgetDetails}
          />
        </>
      )}
    </div>
  );
}
