import type { SelectedPeriodPropInterface } from "../../../../interfaces/budget";
import ExpensesDetails from "./ExpensesDetails";

export default function BudgetDetails({
  selectedPeriod,
}: SelectedPeriodPropInterface) {
  return (
    <div className="flex gap-10 w-[100%]">
      <div className="w-[50%] bg-gray-100 text-black">
        <div className="flex justify-center gap-1 p-2 border-b-1 border-black">
          <h5 className="text-xl">Planned Expenses</h5>
          <button>
            (
            <span className="underline hover:text-blue-500">
              add/remove
            </span>
            )
          </button>
        </div>
        <ExpensesDetails expenses={selectedPeriod.plannedExpenses} />
      </div>
      <div className="w-[50%] bg-gray-200 text-black">
        <div className="flex justify-center gap-1 p-2 border-b-1 border-black">
          <h5 className="text-xl">Actual Expenses</h5>
          <button>
            (
            <span className="underline hover:text-blue-500">
              match the values
            </span>
            )
          </button>
        </div>
        <ExpensesDetails expenses={selectedPeriod.actualExpenses} />
      </div>
    </div>
  );
}
