import { useLocation } from "react-router-dom";
import StickySidebar from "../header & nav/StickySidebar";
import { useEffect, useState } from "react";
import {
  createNewPeriod,
  getAllPeriods,
  getSingleBudget,
} from "../../api/expenses-api";
import toast from "react-hot-toast";
import BudgetOverview from "./Budget Overview/BudgetOverview";
import BudgetAddIncomeExpense from "./BudgetAddIncomeExpense";
import BudgetCards from "./BudgetCards";
import BudgetMembers from "./BudgetMembers";
import type { BudgetInterface, PeriodInterface } from "../../interfaces/budget";

export default function BudgetMiddleware() {
  const [pageToRender, setPageToRender] = useState<string>("budgetOverview");
  const [budget, setBudget] = useState<BudgetInterface | null>(null);
  const [periods, setPeriods] = useState<PeriodInterface[] | null>(null);
  const location = useLocation();
  const budgetId = location.pathname.split("/")[1];

  useEffect(() => {
    (async () => {
      try {
        const getBudgetResponse = await getSingleBudget(budgetId);
        const getBudget: BudgetInterface = getBudgetResponse[0];
        const getPeriods = await getAllPeriods(getBudget.allPeriods);

        if (getPeriods.length == 0) {
          const newPeriod = await createNewPeriod(new Date(), getBudget._id);
          setPeriods([newPeriod]);
        } else {
          setPeriods(getPeriods);
        }

        setBudget(getBudget);
      } catch (e: unknown) {
        if (e instanceof Error) {
          return toast.error(e.message);
        }
      }
    })();
  }, []);
  return (
    <>
      <StickySidebar
        setPageToRender={setPageToRender}
        budget={budget}
        periods={periods}
      />
      {budget && periods && pageToRender == "budgetOverview" ? (
        <BudgetOverview budget={budget} periods={periods} />
      ) : pageToRender == "addIncomeOrExpense" ? (
        <BudgetAddIncomeExpense budget={budget} />
      ) : pageToRender == "cards" ? (
        <BudgetCards budget={budget} setBudget={setBudget} />
      ) : (
        pageToRender == "members" && (
          <BudgetMembers budget={budget} setBudget={setBudget} />
        )
      )}
    </>
  );
}
