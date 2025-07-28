import { expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BudgetAddIncomeExpense from "../../../../components/budget/Add Income&Expenses/BudgetAddIncomeExpense";
import { periods } from "../../../data";

const BudgetAddIncomeExpenseComponent = (
  <BrowserRouter>
    <BudgetAddIncomeExpense
      periods={periods}
      setPeriods={() => {}}
      setUpdateTotalSavings={() => {}}
    />
  </BrowserRouter>
);

it("renders 'BudgetAddIncomeExpense' without crashing", () => {
  render(BudgetAddIncomeExpenseComponent);
});

it("renders div elements correctly", () => {
  render(BudgetAddIncomeExpenseComponent);
  expect(screen.getByText("Add Income")).toBeVisible();
  expect(screen.getByText("Add Expense")).toBeVisible();
});

it("renders classname 'opacity-80' for 'Add Expense' button", () => {
  render(BudgetAddIncomeExpenseComponent);
  expect(screen.getByText("Add Expense")).toHaveClass("opacity-80");
  expect(screen.getByText("Add Income")).not.toHaveClass("opacity-80");
});

it("renders the correct input field", () => {
  render(BudgetAddIncomeExpenseComponent);
  expect(screen.getByText("Add")).toBeVisible();
});

it("renders classname 'opacity-80' for 'Add Income' button when 'Add Expense' button is clicked", () => {
  render(BudgetAddIncomeExpenseComponent);
  const addExpenseBtn = screen.getByText("Add Expense");
  fireEvent.click(addExpenseBtn);
  expect(screen.getByText("Add Income")).toHaveClass("opacity-80");
  expect(screen.getByText("Add Expense")).not.toHaveClass("opacity-80");
});

it("renders the input field for adding income", () => {
  render(BudgetAddIncomeExpenseComponent);
  expect(screen.getByTestId("add-income-button")).toBeVisible();
  expect(screen.queryByTestId("add-expense-button")).not.toBeInTheDocument();
});

it("renders the input field for adding expense when 'Add Expense' button is clicked", () => {
  render(BudgetAddIncomeExpenseComponent);
  const addExpenseBtn = screen.getByText("Add Expense");
  fireEvent.click(addExpenseBtn);
  expect(screen.getByTestId("add-expense-button")).toBeVisible();
  expect(screen.queryByTestId("add-income-button")).not.toBeInTheDocument();
});
