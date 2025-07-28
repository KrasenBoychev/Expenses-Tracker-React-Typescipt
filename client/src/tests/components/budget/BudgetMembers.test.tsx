import { it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BudgetMembers from "../../../components/budget/BudgetMembers";
import type { BudgetInterface } from "../../../interfaces/budget";
import { act } from "react";

const noBudget = null;
const hasBudget: BudgetInterface = {
  _id: "6883be1c10ed396049b94d8f",
  budgetName: "Family Budget",
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

  const input = screen.getByTestId("budget-members-input");
  const addButton = screen.getByTestId("budget-members-button");

  await act(async () => {
    fireEvent.change(input, { target: { value: "test@gmail.com" } });
    fireEvent.click(addButton);

    await fetch("http://localhost:5000/budget/members/addNewMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        memberEmail: "test@gmail.com",
        budgetId: "6883be1c10ed396049b94d8f",
      }),
    });
  });

  expect(screen.getByText("test@gmail.com")).toBeVisible();
});

it("removes a member when 'remove' button is clicked", async () => {
  hasBudget.members.push("6887279090475e736ad08089");
  render(BudgetMembersComponent(hasBudget));

  await waitFor(async () => {
    const removeButton = screen.getByTestId("6887279090475e736ad08089");

    await act(async () => {
      fireEvent.click(removeButton);

      await fetch("http://localhost:5000/budget/members/removeMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: "6887279090475e736ad08089",
          budgetId: "6883be1c10ed396049b94d8f",
        }),
      });
    });
  });

  expect(screen.queryByTestId("test@gmail.com")).not.toBeInTheDocument();
});
