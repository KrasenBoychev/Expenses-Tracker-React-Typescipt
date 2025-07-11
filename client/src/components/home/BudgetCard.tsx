import type {
  BudgetPropInterface,
} from "../../interfaces/budget";

export default function BudgetCard({ budget }: BudgetPropInterface) {
  return (
    <div className="flex flex-col gap-8 w-[250px] h-[270px] text-center bg-white border border-gray-200 shadow-2xs rounded-xl">
      <h3 className="text-xl font-semibold text-blue-600">
        {budget.budgetName}
      </h3>
      <p className="mt-3 text-gray-500 dark:text-neutral-500 rounded"></p>
    </div>
  );
}
