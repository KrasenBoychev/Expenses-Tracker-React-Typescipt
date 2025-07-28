import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Stats from "../../../../components/budget/Budget Overview/Stats";
import { selectedPeriod } from "../../../data";

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
