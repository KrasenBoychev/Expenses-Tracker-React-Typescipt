import type { PeriodInterface } from "../interfaces/budget";

const anotherPeriod: PeriodInterface = {
  _id: "6883be1e10ed396049b94d94",
  startDate: "2025-07-25T17:25:50.649Z",
  endDate: "2025-07-28T12:07:18.592+00:00",
  income: 300,
  expenses: [
    {
      expenseType: "Food",
      plannedExpenses: 30,
      actualExpenses: 5
    },
    {
      expenseType: "Drinks",
      plannedExpenses: 10,
      actualExpenses: 3
    }
  ],
  budgetId: "6883be1c10ed396049b94d8f",
};

export const selectedPeriod: PeriodInterface = {
  _id: "688767f6341ff53d7466a91d",
  startDate: "2025-07-29T12:07:18.592Z",
  endDate: null,
  income: 1000,
  expenses: [
    {
      expenseType: "Food",
      plannedExpenses: 200,
      actualExpenses: 350,
    },
    {
      expenseType: "Going out",
      plannedExpenses: 100,
      actualExpenses: 0,
    },
    {
      expenseType: "Holidays",
      plannedExpenses: 100,
      actualExpenses: 0,
    },
    {
      expenseType: "Pets",
      plannedExpenses: 40,
      actualExpenses: 0,
    },
  ],
  budgetId: "6883be1c10ed396049b94d8f",
}

export const periods = [
  anotherPeriod,
  selectedPeriod,
]