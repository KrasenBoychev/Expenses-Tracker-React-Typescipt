import { it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Options from "../../../../../components/budget/Budget Overview/Options/Options";
import { budget, selectedPeriod } from "../../../../data";

const OptionsComponent = (
  <BrowserRouter>
    <Options
      budget={budget}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={() => {}}
      setPeriods={() => {}}
      setBudgetDetails={() => {}}
    />
  </BrowserRouter>
);

it("renders 'Options' without crashing", () => {
  render(OptionsComponent);
});

it("renders buttons", () => {
  render(OptionsComponent);
  expect(screen.getByText("Details")).toBeVisible();
  expect(screen.getByText("Complete Period")).toBeVisible();
});

it("doesn't render modal", () => {
  render(OptionsComponent);
  expect(
    screen.queryByTestId("confirm-modal-container")
  ).not.toBeInTheDocument();
});

it("doesn't render budget details", () => {
  render(OptionsComponent);
  expect(
    screen.queryByTestId("budget-details-container")
  ).not.toBeInTheDocument();
});

it("renders modal when 'Confirm Period' button is clicked", () => {
  render(OptionsComponent);
  const confirmPeriodBtn = screen.getByText("Complete Period");
  fireEvent.click(confirmPeriodBtn);
  expect(screen.getByTestId("confirm-modal-container")).toBeVisible();
});