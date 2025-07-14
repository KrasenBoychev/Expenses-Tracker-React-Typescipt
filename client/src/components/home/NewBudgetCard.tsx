import { useState } from "react";
import { createNewBudget } from "../../api/expenses-api";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";

export default function NewBudgetCard({ setBudgetsToRender }: any) {
  const [budgetName, setBudgetName] = useState<string>("");
  const authData = useAuthContext();
  const createNewTrackerHandler = async () => {
    if (budgetName == "") {
      return;
    }

    try {
      const newBudget = await createNewBudget(budgetName);

      setBudgetsToRender((prev: string[]) => [...prev, newBudget]);
      authData.budgets.push(newBudget);
      authData.changeAuthState(authData);
      setBudgetName("");
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };
  return (
    <div className="flex flex-col gap-8 w-[250px] h-[270px] text-center bg-gray-200 border border-gray-200 shadow-2xs rounded-xl">
      <div className="flex flex-col gap-8 p-4 md:p-6">
        <h3 className="text-xl font-semibold text-blue-600">
          New Expenses Tracker Name
        </h3>
        <input
          className="mt-3 text-gray-500 dark:text-neutral-500 rounded"
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
        />
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200">
        <a
          className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-xl bg-white text-gray-800 shadow-2xs hover:bg-gray-50 cursor-pointer focus:outline-hidden focus:bg-gray-50 ${
            budgetName == "" && "opacity-50 pointer-events-none"
          }`}
          onClick={createNewTrackerHandler}
        >
          Create
        </a>
      </div>
    </div>
  );
}
