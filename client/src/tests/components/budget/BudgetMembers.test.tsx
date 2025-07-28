import { it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BudgetMembers from "../../../components/budget/BudgetMembers";
import type { BudgetInterface } from "../../../interfaces/budget";

const noBudget = null;
const hasBudget: BudgetInterface = {
  _id: "000",
  budgetName: "test",
  cards: [],
  members: ["68712707cbac7c3410e9408c"],
  allPeriods: [],
};

const BudgetMembersComponent = (budget: BudgetInterface | null) => {
  return (
    <BrowserRouter>
      <BudgetMembers budget={budget} setBudget={() => {}} />
    </BrowserRouter>
  );
};

it("renders 'BudgetMembers' with budget value 'null' without crashing", () => {
  render(BudgetMembersComponent(noBudget));
});

it("renders 'BudgetMembers' with budget value 'object' without crashing", () => {
  render(BudgetMembersComponent(hasBudget));
});

it("renders 'All Members' heading", () => {
  render(BudgetMembersComponent(noBudget));
  expect(screen.getByText("All Members")).toBeVisible();
});

it("renders input field and button", () => {
  render(BudgetMembersComponent(noBudget));
  expect(screen.getByTestId("budget-members-input")).toBeVisible();
  expect(screen.getByTestId("budget-members-button")).toBeVisible();
});

it("renders only one 'li' element if the budget value is 'null'", () => {
  render(BudgetMembersComponent(noBudget));
  expect(screen.getByTestId("budget-members-ul").childElementCount).toEqual(1);
});

it("renders two 'li' elements if the budget has one member", async () => {
  render(BudgetMembersComponent(hasBudget));
  await waitFor(() => {
    expect(screen.getByText("k@gmail.com")).toBeVisible();
    expect(screen.getByTestId("budget-members-ul").childElementCount).toEqual(
      2
    );
  });
});

it("renders the new member when 'add' button is clicked", async () => {
  render(BudgetMembersComponent(hasBudget));
  await waitFor(() => {
    
  });
});