import { Link } from "react-router-dom";
import type { BudgetInterface, PeriodInterface } from "../../interfaces/budget";
import { useEffect, useState } from "react";
interface StickySidebarProps {
  setPageToRender: Function;
  budget: BudgetInterface | null;
  periods: PeriodInterface[] | null;
}

export default function StickySidebar({
  setPageToRender,
  budget,
  periods,
}: StickySidebarProps) {
  const [totalSavings, setTotalSavings] = useState<number>(0);

  useEffect(() => {
    let totalIncome: number = 0;
    let totalPlannedExpense: number = 0;

    if (periods && periods?.length > 0) {
      periods.forEach((period) => {
        totalIncome += period.income;

        if (period.plannedExpenses.length > 0) {
          period.plannedExpenses.forEach((expense) => {
            totalPlannedExpense += expense.value;
          });
        }
      });
    }
    setTotalSavings(totalIncome - totalPlannedExpense);
  }, [periods]);

  return (
    <>
      <div
        id="hs-application-sidebar"
        className="w-65 h-full fixed inset-y-0 start-0 z-60 bg-white border-e border-gray-200
                   block translate-x-0 end-auto bottom-0"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4">
            {/* <!-- Logo --> */}
            <p
              className="flex-none rounded-xl text-xl text-blue-600 inline-block font-semibold focus:outline-hidden focus:opacity-80"
              aria-label="Preline"
            >
              Expenses Tracker
            </p>
            {/* <!-- End Logo --> */}
          </div>

          {/* <!-- Content --> */}
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <nav
              className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul
                className="flex flex-col space-y-1"
                data-hs-scrollspy="#scrollspy"
              >
                <li>
                  <Link
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200 hs-scrollspy-active:bg-gray-100 dark:hs-scrollspy-active:bg-neutral-700 active"
                    to="/"
                  >
                    <i className="fa-solid fa-building-columns"></i>
                    All Budgets
                  </Link>
                </li>

                <li>
                  <p
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 cursor-pointer focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200 hs-scrollspy-active:bg-gray-100 dark:hs-scrollspy-active:bg-neutral-700"
                    onClick={() => setPageToRender("budgetOverview")}
                  >
                    <i className="fa-solid fa-money-bill-wave"></i>
                    {budget?.budgetName} overview
                  </p>
                </li>

                <li>
                  <p
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 cursor-pointer focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200 hs-scrollspy-active:bg-gray-100 dark:hs-scrollspy-active:bg-neutral-700"
                    onClick={() => setPageToRender("addIncomeOrExpense")}
                  >
                    <i className="fa-solid fa-money-bill-transfer"></i>
                    Add Income/Expense
                  </p>
                </li>

                <li>
                  <p
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 cursor-pointer focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200 hs-scrollspy-active:bg-gray-100 dark:hs-scrollspy-active:bg-neutral-700"
                    onClick={() => setPageToRender("cards")}
                  >
                    <i className="fa-solid fa-credit-card"></i>
                    Cards
                  </p>
                </li>

                <li>
                  <p
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 cursor-pointer focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200 hs-scrollspy-active:bg-gray-100 dark:hs-scrollspy-active:bg-neutral-700"
                    onClick={() => setPageToRender("members")}
                  >
                    <i className="fa-solid fa-person"></i>
                    Members
                  </p>
                </li>

                <li>
                  <p className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200 hs-scrollspy-active:bg-gray-100 dark:hs-scrollspy-active:bg-neutral-700">
                    <i className="fa-solid fa-piggy-bank"></i>
                    Total Savings: {totalSavings}
                  </p>
                </li>

                <li>
                  <Link
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200 hs-scrollspy-active:bg-gray-100 dark:hs-scrollspy-active:bg-neutral-700"
                    to="/logout"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* <!-- End Content --> */}
        </div>
      </div>
      {/* <!-- End Sidebar --> */}
    </>
  );
}
