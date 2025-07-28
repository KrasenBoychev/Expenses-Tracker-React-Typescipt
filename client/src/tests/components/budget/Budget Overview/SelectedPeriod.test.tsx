import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SelectPeriod from "../../../../components/budget/Budget Overview/SelectPeriod";
import { periods, selectedPeriod } from "../../../data";

const SelectPeriodComponent = (
  <BrowserRouter>
    <SelectPeriod
      selectedPeriod={selectedPeriod}
      setSelectedPeriod={() => {}}
      periods={periods}
    />
  </BrowserRouter>
);

it("renders 'Selected Period' without crashing", () => {
  render(SelectPeriodComponent);
});

it("renders select element options correctly", () => {
  render(SelectPeriodComponent);
  expect(screen.getByText("29/07/2025 - now")).toBeInTheDocument();
  expect(screen.getByText("25/07/2025 - 28/07/2025")).toBeInTheDocument();
});