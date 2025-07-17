import { useEffect, useState } from "react";
import type {
  BudgetAndPeriodsPropsInterface,
  PeriodInterface,
} from "../../../interfaces/budget";
import SelectPeriod from "./SelectPeriod";
import Stats from "./Stats";

export default function BudgetOverview({
  budget,
  periods,
}: BudgetAndPeriodsPropsInterface) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodInterface>(
    periods![0]
  );

  return (
    <div className="flex flex-col w-full mt-10 ml-[150px] text-center">
      <SelectPeriod selectedPeriod={selectedPeriod} periods={periods} />
      <Stats selectedPeriod={selectedPeriod} />
    </div>
  );
}
