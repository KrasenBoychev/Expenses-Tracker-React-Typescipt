import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { budget, selectedPeriod } from "../../../../data";
import ConfirmModal from "../../../../../components/budget/Budget Overview/Options/ConfirmModal";

const ConfirmModalComponent = (
  <BrowserRouter>
    <ConfirmModal
      setOpenModal={() => {}}
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={() => {}}
      setPeriods={() => {}}
      budget={budget}
    />
  </BrowserRouter>
);

it("renders 'ConfirmModal' without crashing", () => {
  render(ConfirmModalComponent);
});

it("renders heading and buttons", () => {
  render(ConfirmModalComponent);
  expect(screen.getByText("Close")).toBeVisible();
  expect(
    screen.getByText("Are you sure you want to complete that period?")
  ).toBeVisible();
  expect(screen.getByText("Complete Period")).toBeVisible();
  expect(screen.getByText("Cancel")).toBeVisible();
});
