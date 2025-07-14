import { useNavigate } from "react-router-dom";
import NewBudgetCard from "./NewBudgetCard";
import { useEffect, useState } from "react";
import { getAllBudgets } from "../../api/expenses-api";
import { useAuthContext } from "../../contexts/AuthContext";
import BudgetCard from "./BudgetCard";
import type { BudgetInterface } from "../../interfaces/budget";
import toast from "react-hot-toast";

export default function HomeAuth() {
  const [budgetsToRender, setBudgetsToRender] = useState<BudgetInterface[]>([]);
  const { budgets } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const allBudgets = await getAllBudgets(budgets);
        setBudgetsToRender(allBudgets);
      } catch (e: unknown) {
        if (e instanceof Error) {
          return toast.error(e.message);
        }
      }
    })();
  }, []);
  return (
    <>
      <div
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => navigate("/logout")}
      >
        <i className="fa-solid fa-right-from-bracket fa-lg"></i>
      </div>
      <h1 className="mt-10 text-center text-3xl uppercase">
        Welcome to Expenses Tracker
      </h1>
      <div
        className={`flex flex-wrap ${
          budgetsToRender.length == 0 ? "justify-center" : "justify-between"
        } gap-10 max-w-[1000px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto`}
      >
        <NewBudgetCard setBudgetsToRender={setBudgetsToRender} />
        {budgetsToRender.length > 0 &&
          budgetsToRender.map((budget) => (
            <BudgetCard key={budget._id} budget={budget} />
          ))}
      </div>
    </>
  );
}
