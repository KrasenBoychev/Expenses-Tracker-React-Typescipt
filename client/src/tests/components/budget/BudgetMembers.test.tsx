import { it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BudgetMembers from "../../../components/budget/BudgetMembers";

const BudgetMembersComponent = (
  <BrowserRouter>
    <BudgetMembers budget={null} setBudget={() => {}} />
  </BrowserRouter>
);

it("renders 'BudgetMembers' without crashing", () => {
  render(BudgetMembersComponent);
});
