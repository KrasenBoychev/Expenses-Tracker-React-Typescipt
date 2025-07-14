import { useNavigate } from "react-router-dom";
import type { BudgetPropInterface } from "../../interfaces/budget";

export default function BudgetCard({ budget }: BudgetPropInterface) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col gap-8 w-[250px] h-[270px] justify-center text-center bg-white border border-gray-200 shadow-2xs rounded-xl hover:opacity-80 cursor-pointer"
      onClick={() => navigate(`/${budget._id}`)}
    >
      <h3 className="text-2xl font-semibold text-blue-600">
        {budget.budgetName}
      </h3>
      <p className="mt-3 text-gray-500 dark:text-neutral-500 rounded">
        Members: {budget.members.length}
      </p>
    </div>
  );
}
