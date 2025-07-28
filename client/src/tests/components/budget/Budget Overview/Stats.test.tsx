import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Stats from "../../../../components/budget/Budget Overview/Stats";
import type { PeriodInterface } from "../../../../interfaces/budget";

const selectedPeriod: PeriodInterface = {
  _id: "6883be1e10ed396049b94d94",
  startDate: "2025-07-25T17:25:50.649Z",
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
};

const StatsComponent = (
  <BrowserRouter>
    <Stats selectedPeriod={selectedPeriod} />
  </BrowserRouter>
);

it("renders 'Stats' without crashing", () => {
  render(StatsComponent);
});

it("renders all headings", () => {
  render(StatsComponent);
  expect(screen.getByText("Income")).toBeVisible();
  expect(screen.getByText("Planned to spend")).toBeVisible();
  expect(screen.getByText("To save")).toBeVisible();
});

it("renders 'income' correctly", () => {
  render(StatsComponent);
  expect(screen.getByText("1000.00")).toBeVisible();
});

it("renders 'planned expenses' correctly", () => {
  render(StatsComponent);
  expect(screen.getByText("440.00")).toBeVisible();
});

it("renders 'to save' correctly", () => {
  render(StatsComponent);
  expect(screen.getByText("560.00")).toBeVisible();
});
