import type { PeriodInterface } from "../../../interfaces/budget";
interface OptionsProps {
  selectedPeriod: PeriodInterface | undefined;
  setBudgetDetails: Function;
}

export default function Options({
  selectedPeriod,
  setBudgetDetails,
}: OptionsProps) {
  const budgetDetailsHandler = () => {
    setBudgetDetails(true);
  };

  const completeBudgetHandler = () => {};
  return (
    <div className="flex justify-center gap-40 my-5">
      <button
        className="py-3 px-5 bg-gray-400 rounded"
        onClick={budgetDetailsHandler}
      >
        Details
      </button>
      {selectedPeriod!.endDate == null && (
        <button
          className="py-3 px-5 bg-red-500 rounded"
          onClick={completeBudgetHandler}
        >
          Complete Period
        </button>
      )}
    </div>
  );
}
