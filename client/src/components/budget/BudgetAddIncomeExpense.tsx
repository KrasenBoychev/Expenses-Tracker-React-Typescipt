import type { BudgetInterface } from "../../interfaces/budget";

interface BudgetAddIncomeExpenseProps {
  budget: BudgetInterface | null;
}

export default function BudgetAddIncomeExpense({
  budget,
}: BudgetAddIncomeExpenseProps) {
  return <div>BudgetAddIncomeExpense</div>;
}
