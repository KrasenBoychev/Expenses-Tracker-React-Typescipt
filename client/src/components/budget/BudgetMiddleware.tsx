import { useLocation } from "react-router-dom";
import StickySidebar from "../header & nav/StickySidebar";
import { useEffect, useState } from "react";
import { getSingleBudget } from "../../api/expenses-api";
import toast from "react-hot-toast";
import BudgetOverview from "./BudgetOverview";
import BudgetAddIncomeExpense from "./BudgetAddIncomeExpense";
import BudgetCards from "./BudgetCards";
import BudgetMembers from "./BudgetMembers";
import type { BudgetInterface } from "../../interfaces/budget";

export default function BudgetMiddleware() {
  const [pageToRender, setPageToRender] = useState<string>("budgetOverview");
  const [budget, setBudget] = useState<BudgetInterface | null>(null);
  const location = useLocation();
  const budgetId = location.pathname.split("/")[1];

  useEffect(() => {
    (async () => {
      try {
        const getBudget = await getSingleBudget(budgetId);
        setBudget(getBudget[0]);
      } catch (e: unknown) {
        if (e instanceof Error) {
          return toast.error(e.message);
        }
      }
    })();
  }, []);
  return (
    <>
      <StickySidebar setPageToRender={setPageToRender} />
      {pageToRender == "budgetOverview" && <BudgetOverview budget={budget} />}
      {pageToRender == "addIncomeOrExpense" && (
        <BudgetAddIncomeExpense budget={budget} />
      )}
      {pageToRender == "cards" && <BudgetCards budget={budget} />}
      {pageToRender == "members" && <BudgetMembers budget={budget} />}
    </>
  );
}
