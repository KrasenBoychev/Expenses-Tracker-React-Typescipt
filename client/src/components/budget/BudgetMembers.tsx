import type { BudgetInterface } from "../../interfaces/budget";

interface BudgetMembersProps {
  budget: BudgetInterface | null;
}

export default function BudgetMembers({ budget }: BudgetMembersProps) {
  return <div>BudgetMembers</div>;
}
