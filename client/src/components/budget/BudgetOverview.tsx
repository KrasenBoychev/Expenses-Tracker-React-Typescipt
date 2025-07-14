import type { BudgetMiddlewarePropInterface } from "../../interfaces/budget";

export default function BudgetOverview({ budget }: BudgetMiddlewarePropInterface) {
  return <div>{budget?.budgetName}</div>;
}
